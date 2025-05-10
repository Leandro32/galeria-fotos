# Go Backend Implementation for High-Volume Photo Processing

## Overview

This document outlines the implementation of a lightweight Go backend service for the photo gallery application, optimized for AWS deployment with minimal memory footprint while handling high-volume photo processing:

- **Scale**: 4,000 photos per photographer × 15 photographers daily (60,000 photos/day)
- **Size**: Average 4MB per photo (~240GB of new data daily)
- **Performance**: Must handle concurrent uploads with minimal memory usage

## Technology Stack

- **Language**: Go 1.21+ (with generics for better type safety)
- **Web Framework**: [Fiber](https://github.com/gofiber/fiber) (ultra-fast, low-memory framework based on fasthttp)
- **Database**: MongoDB with official Go driver (better for high-volume document storage)
- **Object Storage**: AWS S3 with multipart uploads and lifecycle policies
- **Caching**: Redis for metadata and hot-path caching
- **Queue System**: AWS SQS for asynchronous processing
- **Authentication**: API keys with Redis-backed rate limiting
- **Containerization**: Docker with multi-stage builds and minimal base images

## Architecture

```
┌────────────────┐      ┌────────────────┐      ┌────────────────┐      ┌────────────────┐
│                │      │                │      │                │      │                │
│  Upload API    │─────▶│  SQS Queue     │─────▶│  Processor     │─────▶│  MongoDB       │
│  (Fiber)       │      │  (Buffering)   │      │  Workers       │      │  (Metadata)    │
│                │      │                │      │                │      │                │
└────────────────┘      └────────────────┘      └────────────────┘      └────────────────┘
       │                                               │
       │                                               │
       ▼                                               ▼
┌────────────────┐                           ┌────────────────┐
│                │                           │                │
│  S3 Standard   │                           │  S3 IA/Glacier │
│  (Recent)      │                           │  (Archive)     │
│                │                           │                │
└────────────────┘                           └────────────────┘
       │
       │
       ▼
┌────────────────┐      ┌────────────────┐
│                │      │                │
│  CloudFront    │─────▶│  Client        │
│  CDN           │      │  Applications  │
│                │      │                │
└────────────────┘      └────────────────┘
```

## Memory Optimization Strategies

1. **Streaming Processing**: Never load entire photos into memory
2. **Worker Pool Architecture**: Dedicated processing pools with controlled concurrency
3. **Asynchronous Processing**: Decouple upload from processing using SQS
4. **Database Selection**: MongoDB for better performance with document-oriented data at this scale
5. **Sharding Strategy**: Time-based collection sharding for efficient queries
6. **Metadata Separation**: Store image metadata separate from binary data
7. **Aggressive Garbage Collection**: Custom GC tuning for memory-intensive operations

## API Endpoints

| Endpoint | Method | Description | Request | Response |
|----------|--------|-------------|---------|----------|
| `/api/photos/upload` | POST | Upload photo (streaming) | Multipart form data | Upload ID + status |
| `/api/photos/batch` | POST | Schedule batch upload | S3 paths or URLs | Batch ID |
| `/api/photos/status/:id` | GET | Check processing status | - | Processing status |
| `/api/photos/search` | GET | Search photos with pagination | Advanced query params | Photo metadata with URLs |
| `/api/collections` | GET | List collections | `?cursor=abc&limit=20` | Collection list |
| `/api/collections/:id/photos` | GET | Get photos in collection | Pagination params | Photos metadata + URLs |
| `/api/auth/keys` | POST | Generate API key | Authentication details | API key credentials |

## Database Schema (MongoDB)

```javascript
// Photographers collection
{
  "_id": ObjectId(),
  "name": "Jane Smith",
  "email": "jane@example.com",
  "apiKey": "hashed-api-key",
  "dailyQuota": 5000,
  "usedToday": 3240,
  "createdAt": ISODate("2023-05-01T..."),
  "updatedAt": ISODate("2023-05-01T...")
}

// Photos collection (sharded by uploadDate)
{
  "_id": ObjectId(),
  "photographerId": ObjectId("ref to photographer"),
  "fileName": "wedding_123.jpg",
  "title": "Beach Wedding",
  "description": "Ceremony at sunset",
  "uploadDate": ISODate("2023-05-01T..."),
  "processingStatus": "complete", // [pending, processing, complete, failed]
  "metadata": {
    "width": 3840,
    "height": 2160,
    "format": "jpeg",
    "colorProfile": "sRGB",
    "camera": "Sony A7IV",
    "lens": "24-70mm f/2.8",
    "iso": 100,
    "exposure": "1/250",
    "gpsCoordinates": [...]
  },
  "storage": {
    "s3Bucket": "photo-gallery-prod",
    "s3Key": "photographers/jane-smith/2023/05/01/wedding_123.jpg",
    "contentType": "image/jpeg",
    "sizeBytes": 4194304,
    "md5Hash": "a1b2c3...",
    "storageClass": "STANDARD"
  },
  "derivatives": [
    {
      "type": "thumbnail",
      "width": 150,
      "height": 150,
      "s3Key": "derivatives/photographers/jane-smith/2023/05/01/wedding_123_thumb.jpg",
      "sizeBytes": 15360
    },
    {
      "type": "web",
      "width": 1200,
      "height": 800,
      "s3Key": "derivatives/photographers/jane-smith/2023/05/01/wedding_123_web.jpg",
      "sizeBytes": 524288
    }
  ],
  "collectionsIds": [ObjectId(), ObjectId()],
  "tags": ["wedding", "beach", "sunset"],
  "createdAt": ISODate("2023-05-01T..."),
  "updatedAt": ISODate("2023-05-01T...")
}

// Collections collection
{
  "_id": ObjectId(),
  "photographerId": ObjectId("ref to photographer"),
  "name": "Beach Weddings 2023",
  "description": "All beach wedding shoots from 2023",
  "coverPhotoId": ObjectId("ref to photo"),
  "photoCount": 142,
  "createdAt": ISODate("2023-05-01T..."),
  "updatedAt": ISODate("2023-05-01T...")
}
```

## AWS Infrastructure

- **EC2**: Spot Instances in Auto Scaling Group (cost optimization)
  - m6g.large for API servers (4 vCPU, 8GB RAM)
  - c6g.xlarge for processing workers (4 vCPU, 8GB RAM, compute optimized)
- **S3**:
  - Standard storage for recent (< 30 days) photos
  - Intelligent Tiering for older photos
  - Lifecycle policy to archive to Glacier after 90 days
- **MongoDB Atlas**: Cluster with time-series collections and sharding
- **ElastiCache**: Redis for caching and rate limiting
- **SQS**: For upload queue and processing tasks
- **Lambda**: For thumbnail generation and metadata extraction
- **CloudFront**: CDN with signed URLs for secure delivery

## Memory Management Guidelines

1. **Chunked Streaming**: Process uploads in 1MB chunks, never loading entire files into memory

```go
// Example: Streaming multipart upload to S3
func uploadHandler(c *fiber.Ctx) error {
    // Get multipart form
    form, err := c.MultipartForm()
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
    }
    
    file, err := form.File["photo"][0].Open()
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to open file"})
    }
    defer file.Close()
    
    // Create a unique upload ID
    uploadID := uuid.New().String()
    
    // Initialize multipart upload
    input := &s3.CreateMultipartUploadInput{
        Bucket: aws.String(s3BucketName),
        Key:    aws.String(fmt.Sprintf("uploads/%s/%s", photographerID, uploadID)),
        ContentType: aws.String(form.File["photo"][0].Header.Get("Content-Type")),
    }
    
    result, err := s3Client.CreateMultipartUpload(context.Background(), input)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to initialize upload"})
    }
    
    // Submit to processing queue instead of processing synchronously
    task := PhotoProcessingTask{
        UploadID: uploadID,
        PhotographerID: photographerID,
        FileName: form.File["photo"][0].Filename,
        ContentType: form.File["photo"][0].Header.Get("Content-Type"),
        Size: form.File["photo"][0].Size,
    }
    
    err = queueClient.EnqueueTask(context.Background(), task)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to queue task"})
    }
    
    return c.Status(fiber.StatusAccepted).JSON(fiber.Map{
        "uploadId": uploadID,
        "status": "queued",
        "statusCheckEndpoint": fmt.Sprintf("/api/photos/status/%s", uploadID),
    })
}
```

2. **Memory-Bounded Worker Pool**:

```go
// Worker pool with memory limit
func NewWorkerPool(maxWorkers int, maxMemoryMB int) *WorkerPool {
    memoryPerWorkerMB := maxMemoryMB / maxWorkers
    
    pool := &WorkerPool{
        tasks:   make(chan Task, 100),
        workers: maxWorkers,
        quit:    make(chan bool),
        wg:      &sync.WaitGroup{},
    }
    
    // Start fixed number of workers with memory limits
    for i := 0; i < maxWorkers; i++ {
        pool.wg.Add(1)
        go func(workerID int) {
            defer pool.wg.Done()
            
            // Set soft memory limit for this worker
            debug.SetMemoryLimit(int64(memoryPerWorkerMB * 1024 * 1024))
            
            for task := range pool.tasks {
                // Process task with memory awareness
                task.Process()
                
                // Force GC after processing to release memory
                runtime.GC()
            }
        }(i)
    }
    
    return pool
}
```

3. **Custom Memory Management**:

```go
// Use preallocated buffers for image processing
var bufferPool = sync.Pool{
    New: func() interface{} {
        // 1MB buffer (common chunk size)
        return make([]byte, 1024*1024)
    },
}

func processImageChunk(chunk io.Reader) error {
    buffer := bufferPool.Get().([]byte)
    defer bufferPool.Put(buffer)
    
    // Use buffer for processing...
    // ...
    
    return nil
}
```

## Monitoring and Optimization

1. **Critical Metrics**:
   - Memory usage per upload/processing operation
   - Queue depth and processing latency
   - S3 multipart upload success/failure rates
   - MongoDB operation latency

2. **Alerting Thresholds**:
   - Worker memory exceeding 80% allocation
   - Processing queue backlog > 10,000 items
   - Photo processing time > 30 seconds
   - Error rate > 1%

3. **Memory Profiling**:
   - Continuous pprof endpoints for heap analysis
   - Daily memory usage reports
   - Automatic heap dumps on high memory events

## Deployment Process

1. **Resource Efficient Container**:

```dockerfile
# Multi-stage build for minimal memory footprint
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .

# Use build flags for memory optimization
RUN CGO_ENABLED=0 GOOS=linux GOARCH=arm64 go build \
    -ldflags="-s -w -extldflags '-static'" \
    -o photosvc ./cmd/photosvc

FROM alpine:3.18
RUN apk --no-cache add ca-certificates tzdata
WORKDIR /app
COPY --from=builder /app/photosvc .

# Set memory limits at the container level
ENV GOMEMLIMIT=512MiB

# Run with explicit GC tuning for memory efficiency
CMD ["./photosvc", "-gogc=20"]
```

2. **Auto-Scaling Strategy**:
   - Scale API servers based on request rate
   - Scale workers based on SQS queue depth
   - Implement graceful degradation during high load

## Performance Benchmarks

Target metrics for handling 60,000 photos (~240GB) per day:

- **API Servers (m6g.large)**: 
  - Memory usage: < 2GB per instance
  - Upload acceptance rate: 100+ photos/second
  - Concurrent uploads: 200+

- **Worker Servers (c6g.xlarge)**:
  - Memory usage: < 6GB per instance
  - Processing rate: 2+ photos/second/worker
  - Workers needed: ~15-20 to handle daily volume

- **Database Performance**:
  - Query latency (p95): < 50ms
  - Write throughput: 10+ photos/second

## Data Retention and Archive Strategy

1. **Tiered Storage**:
   - 0-30 days: S3 Standard
   - 31-90 days: S3 Intelligent Tiering
   - 91+ days: S3 Glacier
   
2. **Derivative Management**:
   - Generate web-optimized versions on upload
   - Thumbnails stored in S3 with CloudFront caching
   - Original files preserved in archival storage
   
3. **Backup Strategy**:
   - MongoDB incremental backups daily
   - Weekly full backup of all metadata
   - S3 cross-region replication for disaster recovery

## Security and Compliance

1. **Photographer Authentication**:
   - API keys for programmatic access
   - JWT tokens for web interface
   - OAuth2 for third-party integration
   
2. **Upload Security**:
   - Presigned URLs for direct-to-S3 uploads
   - Virus/malware scanning on ingestion
   - Content type verification
   
3. **Access Controls**:
   - Photographer-level isolation
   - Collection-based permissions
   - Signed URLs with expiration for photo access 
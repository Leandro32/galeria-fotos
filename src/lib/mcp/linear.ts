import axios from 'axios';

export interface LinearIssue {
  id: string;
  identifier: string;
  title: string;
  description?: string;
  status: string;
  priority?: number;
  assignee?: {
    id: string;
    name: string;
    email?: string;
  };
  createdAt: string;
  updatedAt: string;
  url: string;
}

const MCP_SERVER_URL = process.env.MCP_SERVER_URL || 'http://localhost:3000';

/**
 * Fetches issues from Linear using the MCP server
 */
export async function fetchLinearIssues(): Promise<LinearIssue[]> {
  try {
    const response = await axios.get(`${MCP_SERVER_URL}/api/linear/issues`);
    return response.data.issues;
  } catch (error) {
    console.error('Error fetching Linear issues:', error);
    return [];
  }
}

/**
 * Fetch issues for a specific project
 */
export async function fetchProjectIssues(projectId: string): Promise<LinearIssue[]> {
  try {
    const response = await axios.get(`${MCP_SERVER_URL}/api/linear/projects/${projectId}/issues`);
    return response.data.issues;
  } catch (error) {
    console.error(`Error fetching issues for project ${projectId}:`, error);
    return [];
  }
}

/**
 * Fetch all issues across all projects
 */
export async function fetchAllIssues(): Promise<LinearIssue[]> {
  try {
    const response = await axios.get(`${MCP_SERVER_URL}/api/linear/issues/all`);
    return response.data.issues;
  } catch (error) {
    console.error('Error fetching all Linear issues:', error);
    return [];
  }
} 
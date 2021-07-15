import { v4 as uuidv4 } from "uuid";
import moment from "moment";

// Mutation of Adding Projects
export const createProjects = (
    description,
    projectsTitle,
    projectsUrl,
    userId,
    userName
  ) => {
    const projectId = uuidv4();
    const query = {
      query: `mutation createProjects {
        createProjects(input: {createdAt: "${moment.utc(new Date()).format()}", description: "${description}", projectId: "${projectId}", projectsTitle: "${projectsTitle}", projectsUrl: "${projectsUrl}", userId: "${userId}", userName: "${userName}"}) {
          projectId
          projectsTitle
        }
      }`,
    };
    return query;
  };
  
// Query for fetching Projects
export const fetchingProjects = () => {
    const query = {
      query: `query listProjects {
        listProjectss {
          items {
            createdAt
            description
            projectId
            projectsUrl
            projectsTitle
            updatedAt
            userId
            userName
          }
        }
      }
      `,
    };
    return query;
  };
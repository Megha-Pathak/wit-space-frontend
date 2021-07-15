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
        createProjects(input: {createdAt: "${moment
          .utc(new Date())
          .format()}", description: "${description}", projectId: "${projectId}", projectsTitle: "${projectsTitle}", projectsUrl: "${projectsUrl}", userId: "${userId}", userName: "${userName}"}) {
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

// Mutation for adding resources
export const createResources = (
  description,
  resourceType,
  resourceUrl,
  userId,
  userName
) => {
  const resourceId = uuidv4();
  const query = {
    query: `mutation createResources {
      createResources(input: {createdAt: "${moment
        .utc(new Date())
        .format()}", resourceDescription: "${description}", resourceId: "${resourceId}", resourceType: ${resourceType}, resourceUrl: "${resourceUrl}", userId: "${userId}", userName: "${userName}"}) {
        resourceId
        resourceType
      }
    }
    `,
  };
  return query;
};

// Getting List of Resources
export const fetchingResources = () => {
  const query = {
    query: `query listResourcess {
      listResourcess {
        items {
          createdAt
          resourceDescription
          resourceId
          resourceType
          resourceUrl
          userName
        }
      }
    }
      `,
  };
  return query;
};

// Mutation of Adding Opportunity
export const createOpportunites = (
  opportunityUrl,
  opportunityName,
  opportunityType,
  userId,
  userName
) => {
  const query = {
    query: `mutation createOpportunites {
      createOpportunites(input: {createdAt: "${moment.utc(new Date()).format()}", opportunityName: "${opportunityName}", opportunityType: ${opportunityType}, opportunityUrl: "${opportunityUrl}", userId: "${userId}", userName: "${userName}"}) {
        opportunityType
      }
    }`,
  };
  return query;
};

// Getting List of Opportunity
export const fetchOpportunitess = (
) => {
  const query = {
    query: `query listOpportunitess {
      listOpportunitess {
        items {
          createdAt
          opportunityType
          opportunityUrl
          opportunityName
          userId
          userName
        }
      }
    }`,
  };
  return query;
};





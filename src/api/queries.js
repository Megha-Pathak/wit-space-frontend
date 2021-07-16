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
      createOpportunites(input: {createdAt: "${moment
        .utc(new Date())
        .format()}", opportunityName: "${opportunityName}", opportunityType: ${opportunityType}, opportunityUrl: "${opportunityUrl}", userId: "${userId}", userName: "${userName}"}) {
        opportunityType
      }
    }`,
  };
  return query;
};

// Getting List of Opportunity
export const fetchOpportunitess = () => {
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

// Creating a post for dev care
export const createDevCare = (description, imageUrl, userId, userName) => {
  const query = {
    query: `mutation createDevCare {
      createDevCare(input: {createdAt: "${moment
        .utc(new Date())
        .format()}", description: "${description}", imageUrl: "${imageUrl}", userId: "${userId}", userName: "${userName}"}) {
        imageUrl
        userId
      }
    }`,
  };
  return query;
};

// Getting All Dev Care Posts
export const listDevCares = () => {
  const query = {
    query: `query listDevCares {
      listDevCares {
        items {
          createdAt
          description
          imageUrl
          userId
          userName
        }
      }
    }
    `,
  };
  return query;
};

// Mutation to create ideas

export const createIdeas = (
  ideaDescription,
  ideaTitle,
  isAnoymous,
  userId,
  userName
) => {
  const ideaId = uuidv4();
  const query = {
    query: `mutation createIdeas {
      createIdeas(input: {createdAt: "${moment
        .utc(new Date())
        .format()}", ideaDescription: "${ideaDescription}", ideaId: "${ideaId}", ideaTitle: "${ideaTitle}", isAnoymous: ${isAnoymous}, userId: "${userId}", userName: "${userName}"}) {
        ideaDescription
      }
    }
    `,
  };
  return query;
};

// Query to get all discussions
export const listIdeass = () => {
  const query = {
    query: `query listIdeass {
      listIdeass {
        items {
          createdAt
          ideaDescription
          ideaId
          ideaTitle
          isAnoymous
          userId
          userName
          comments {
            items {
              createdAt
              ideaComment
              ideaId
              userId
              userName
            }
          }
        }
      }
    }
    `,
  };
  return query;
};


// Mutation to add feedback for a project
export const createProjectFeedbacks = (
  projectId,
  projectFeedback,
  feedbackType,
  userId,
  userName
) => {
  const ideaId = uuidv4();
  const query = {
    query: `mutation createProjectFeedbacks {
      createProjectFeedbacks(input: {createdAt: "${moment
        .utc(new Date())
        .format()}", feedbackType: ${feedbackType}, projectFeedback: "${projectFeedback}", projectId: "${projectId}", userId: "${userId}", userName: "${userName}"}) {
        projectFeedback
      }
    }
    
    `,
  };
  return query;
};

// Mutation to create comment to the idea/discussion

export const createIdeaComments = (
  ideaId,
  ideaComment,
  userId,
  userName
) => {
  const query = {
    query: `mutation createIdeaComments {
      createIdeaComments(input: {createdAt: "${moment
        .utc(new Date())
        .format()}", ideaComment: "${ideaComment}", ideaId: "${ideaId}", userId: "${userId}", userName: "${userName}"}) {
        ideaComment
      }
    }
    `,
  };
  return query;
};




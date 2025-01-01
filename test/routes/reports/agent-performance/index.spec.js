/**
 * Author: Professor Krasso
 * Date: 10 September 2024
 * File: index.spec.js
 * Description: Test the agent performance API
 */

// Require the modules
const request = require('supertest');
const app = require('../../../../src/app');

const { mongo } = require('../../../../src/utils/mongo');

jest.mock('../../../../src/utils/mongo');

// Test the agent performance API
describe('Apre Agent Performance API', () => {
  beforeEach(() => {
    mongo.mockClear();
  });

  // Test the call-duration-by-date-range endpoint
  it('should fetch call duration data for agents within a specified date range', async () => {
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([
            {
              agents: ['Agent A', 'Agent B'],
              callDurations: [120, 90]
            }
          ])
        })
      };
      await callback(db);
    });

    const response = await request(app).get('/api/reports/agent-performance/call-duration-by-date-range?startDate=2023-01-01&endDate=2023-01-31'); // Send a GET request to the call-duration-by-date-range endpoint

    expect(response.status).toBe(200); // Expect a 200 status code

    // Expect the response body to match the expected data
    expect(response.body).toEqual([
      {
        agents: ['Agent A', 'Agent B'],
        callDurations: [120, 90]
      }
    ]);
  });

  // Test the call-duration-by-date-range endpoint with missing parameters
  it('should return 400 if startDate or endDate is missing', async () => {
    const response = await request(app).get('/api/reports/agent-performance/call-duration-by-date-range?startDate=2023-01-01'); // Send a GET request to the call-duration-by-date-range endpoint with missing endDate
    expect(response.status).toBe(400); // Expect a 400 status code

    // Expect the response body to match the expected data
    expect(response.body).toEqual({
      message: 'Start date and end date are required',
      status: 400,
      type: 'error'
    });
  });

  // Test the call-duration-by-date-range endpoint with an invalid endpoint
  it('should return 404 for an invalid endpoint', async () => {
    const response = await request(app).get('/api/reports/agent-performance/invalid-endpoint'); // Send a GET request to an invalid endpoint
    expect(response.status).toBe(404); // Expect a 404 status code
    // Expect the response body to match the expected data
    expect(response.body).toEqual({
      message: 'Not Found',
      status: 404,
      type: 'error'
    });
  });
});

// Test the agent performance by month API
// Author: Bernice Templeman
describe('Apre Agent Performance by Month API', () => {
  beforeEach(() => {
    mongo.mockClear();
  });

  // Test the call-duration-by-date-range endpoint
  it('should fetch call duration data for agents within a specified month', async () => {
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([
            {
              agents: ['Agent A', 'Agent B'],
              callDurations: [120, 90]
            }
          ])
        })
      };
      await callback(db);
    });

    const response = await request(app).get('/api/reports/agent-performance/call-duration-by-month?month=1&year=2023'); // Send a GET request to the call-duration-by-date-range endpoint

    expect(response.status).toBe(200); // Expect a 200 status code

    // Expect the response body to match the expected data
    expect(response.body).toEqual([
      {
        agents: ['Agent A', 'Agent B'],
        callDurations: [120, 90]
      }
    ]);
  });

});



// Test the agent performance API for agent performance report by supervisor.
describe('Apre Agent Performance API - Performance By Supervisor', () => {
  beforeEach(() => {
    mongo.mockClear();
  });

   /**
 * Author: Diana ruiz Garcia
 * Date: 9 November 2024
 * File: agent-performance-by-supervisor.spec.js
 * Description: Test the agent performance API for agent performance report by supervisor.
 */
  // Test the agent-performance-by-supervisor endpoint
  it('should fetch performance data for agents with a specified supervisor', async () => {
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([
            {
              agents: ['Mia Rodriguez', 'Mason Walker', 'Ava Lewis', 'Matthew Harris', 'Ethan Clark', 'Lucas Martinez'],
              resolutionsTime: [150, 120, 100, 120, 130, 100]
            }
          ])
        })
      };
      await callback(db);
    });


    const response = await request(app).get('/api/reports/agent-performance/agent-performance-by-supervisor/650c1f1e1c9d440000a1b1c4'); // Send a GET request to the agent-performance-by-supervisor endpoint

    expect(response.status).toBe(200); // Expect a 200 status code

    // Expect the response body to match the expected data
    expect(response.body).toEqual([
      {
        agents: ['Mia Rodriguez', 'Mason Walker', 'Ava Lewis', 'Matthew Harris', 'Ethan Clark', 'Lucas Martinez'],
        resolutionsTime: [150, 120, 100, 120, 130, 100]
      }
    ]);
  });


  // Test the agent-performance-by-supervisor endpoint if no supervisor is found
  it('should return 200 with an empty array if no supervisor is found', async () => {
    // Create a mock of the request and return data
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        distinct: jest.fn().mockResolvedValue([])
      };
      await callback(db);
    });

    // Send a GET request to the agent-performance-by-supervisor endpoint
    const response = await request(app).get('/api/reports/agent-performance/agent-performance-by-supervisor/');

    // Expect the status code to be 200
    expect(response.status).toBe(200);
    // Expect the response to be an empty array
    expect(response.body).toEqual([]);
  });

  // Test the agent-performance-by-supervisor endpoint with an invalid supervisor
  it('should return 400 for an invalid endpoint', async () => {
    const response = await request(app).get('/api/reports/agent-performance/agent-performance-by-supervisor/invalid-supervisor'); // Send a GET request to an invalid endpoint
    expect(response.status).toBe(400); // Expect a 500 status code
    // Expect the response body to match the expected data
    expect(response.body).toEqual({
      message: 'Supervisor ID is required',
      status: 400,
      type: 'error'
    });
  });
});

/**
 * Author: Sheldon Skaggs
 * Date: 11/082024
 * File: performance-by-metric.spec.js
 * Description: Test the agent performance by metric report api
 */


// Test suite for the Agent Performance by Metric Report API
describe('APRE Agent Performance by Metric Suite', () => {
  // Clear the mock before each test
  beforeEach(() => {
    mongo.mockClear();
  });

  // Test accessing an invalid endpoint
  it('should return 404 for an invalid endpoint', async () => {
    // Send a GET request to an invalid endpoint
    const response = await request(app).get('/api/reports/agent-performance/not-an-endpoint');

    // Expect a 404 status code
    expect(response.status).toBe(404);
    // Expect the response body to match the expected data
    expect(response.body).toEqual({
      message: 'Not Found',
      status: 404,
      type: 'error'
    });
  });

  // Test the performance-by-metric endpoint for a metric that does not exist
  it('should return a 200 status with no metric values for each agent for a metric that does not exist', async () => {
    // Create a mock of the expected return data
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([
            {
              "agentId": 1000,
              "agentName": "Jon Anderson",
              "metricName": "",
              "metricValue": 0,
            },
            {
              "agentId": 1002,
              "agentName": "Rindy Ross",
              "metricName": "",
              "metricValue": 0,
            },
            {
              "agentId": 1,
              "agentName": "Tom Scholz",
              "metricName": "",
              "metricValue": 0,
            }
          ])
        })
      };
      await callback(db);
    });

    // Send a GET request to the reports/agent-performance/performance-by-metric/:metricName endpoint using the value of InVaLiD
    const response = await request(app).get('/api/reports/agent-performance/performance-by-metric/InVaLiD');

    // Expect the status code to be 200
    expect(response.status).toBe(200);
    // Expect the response body to match the expected data
    expect(response.body).toEqual([
      {
        "agentId": 1000,
        "agentName": "Jon Anderson",
        "metricName": "",
        "metricValue": 0,
      },
      {
        "agentId": 1002,
        "agentName": "Rindy Ross",
        "metricName": "",
        "metricValue": 0,
      },
      {
        "agentId": 1,
        "agentName": "Tom Scholz",
        "metricName": "",
        "metricValue": 0,
      }
    ]);
  });

  // Test the performance-by-metric endpoint for a valid metric
  it('should return a 200 status with metric values for each agent for a given metric', async () => {
    // Create a mock of the expected return data
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([
            {
              "agentId": 1000,
              "agentName": "Jon Anderson",
              "metricName": "Customer Satisfaction",
              "metricValue": 80,
            },
            {
              "agentId": 1002,
              "agentName": "Rindy Ross",
              "metricName": "Customer Satisfaction",
              "metricValue": 100,
            },
            {
              "agentId": 1,
              "agentName": "Tom Scholz",
              "metricName": "Customer Satisfaction",
              "metricValue": 90,
            }
          ])
        })
      };
      await callback(db);
    });

    // Send a GET request to the reports/agent-performance/performance-by-metric/:metricName endpoint using the value of Customer Satisfaction
    const response = await request(app).get('/api/reports/agent-performance/performance-by-metric/Customer Satisfaction');

    // Expect the status code to be 200
    expect(response.status).toBe(200);
    // Expect the response body to match the expected data
    expect(response.body).toEqual([
      {
        "agentId": 1000,
        "agentName": "Jon Anderson",
        "metricName": "Customer Satisfaction",
        "metricValue": 80,
      },
      {
        "agentId": 1002,
        "agentName": "Rindy Ross",
        "metricName": "Customer Satisfaction",
        "metricValue": 100,
      },
      {
        "agentId": 1,
        "agentName": "Tom Scholz",
        "metricName": "Customer Satisfaction",
        "metricValue": 90,
      }
    ]);
  });
});

/**
 * Author: Brandon Salvemini
 * Date: 7 November 2024
 * File: agent-data-by-region.spec.js
 * Description: Test the agent performance data by region API
 */

// Test the agent performance data by region API
describe('Apre Agent Performance data by region API', () => {
  beforeEach(() => {
    mongo.mockClear();
  });

  // Test the regions/region endpoint
  it('should fetch a list of distinct agent performance regions', async () => {
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        distinct: jest.fn().mockResolvedValue(['Africa','Asia','Australia','Europe','North America','South America'])
      };
      await callback(db);
    });

    const response = await request(app).get('/api/reports/agent-performance/regions'); // Send a GET request to the region/regions endpoint

    expect(response.status).toBe(200); // Expect a 200 status code
    expect(response.body).toEqual(['Africa','Asia','Australia','Europe','North America','South America']); // Expect the response body to match the expected data
  });


  it('should return 200 and an empty array if no data is found for the region', async () => {
    // Mock the MongoDB implementation
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([])
        })
      };
      await callback(db);
    });

    // Make a request to the endpoint
    const response = await request(app).get('/api/reports/agent-performance/regions/unknown-region');

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  // Test the customer-feedback/regions endpoint
  it('should fetch a list of distinct regions', async () => {
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        distinct: jest.fn().mockResolvedValue(['North', 'South', 'East', 'West'])
      };
      await callback(db);
    });

    //agent-performance/regions
    const response = await request(app).get('/api/reports/agent-performance/regions'); // Send a GET request to the customer-feedback/regions endpoint
    expect(response.status).toBe(200); // Expect a 200 status code
    expect(response.body).toEqual(['North', 'South', 'East', 'West']); // Expect the response body to match the expected data
  });

});
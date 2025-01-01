/**
 * Author: Professor Krasso
 * Date: 8/14/24
 * File: index.js
 * Description: Apre agent performance API for the agent performance reports
 *
 * 11/10/2024 Feat(): Added agent performance by Month API. (Bernice Templeman)
 */

"use strict";

const express = require("express");
const { mongo } = require("../../../utils/mongo");
const createError = require("http-errors");

const router = express.Router();

/**
 * @description
 *
 * GET /call-duration-by-date-range
 *
 * Fetches call duration data for agents within a specified date range.
 *
 * Example:
 * fetch('/call-duration-by-date-range?startDate=2023-01-01&endDate=2023-01-31')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get("/call-duration-by-date-range", (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return next(createError(400, "Start date and end date are required"));
    }

    console.log(
      "Fetching call duration report for date range:",
      startDate,
      endDate
    );

    mongo(async (db) => {
      const data = await db
        .collection("agentPerformance")
        .aggregate([
          {
            $match: {
              date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
              },
            },
          },
          {
            $lookup: {
              from: "agents",
              localField: "agentId",
              foreignField: "agentId",
              as: "agentDetails",
            },
          },
          {
            $unwind: "$agentDetails",
          },
          {
            $group: {
              _id: "$agentDetails.name",
              totalCallDuration: { $sum: "$callDuration" },
            },
          },
          {
            $project: {
              _id: 0,
              agent: "$_id",
              callDuration: "$totalCallDuration",
            },
          },
          {
            $group: {
              _id: null,
              agents: { $push: "$agent" },
              callDurations: { $push: "$callDuration" },
            },
          },
          {
            $project: {
              _id: 0,
              agents: 1,
              callDurations: 1,
            },
          },
        ])
        .toArray();

      res.send(data);
    }, next);
  } catch (err) {
    console.error("Error in /call-duration-by-date-range", err);
    next(err);
  }
});


/**
 * @description
 *
 * Author: Bernice Templeman
 * GET /call-duration-by-month
 *
 * Fetches call duration data for agents within a specified date range.
 *
 * Example:
 * fetch('/call-duration-by-date-range?startDate=2023-01-01&endDate=2023-01-31')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 *
 */
router.get("/call-duration-by-month", (req, res, next) => {
  try {
    let { month, year } = req.query;

    if (!month || !year ) {
      return next(createError(400, "Month and year are required"));
    }

    // subtract 1 for month
    month = month - 1;
    let startDate = new Date(year, month, 1);
    let endDate = new Date(year, month + 1, 0);

    mongo(async (db) => {
      const data = await db
        .collection("agentPerformance")
        .aggregate([
          {
            $match: {
              date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
              },
            },
          },
          {
            $lookup: {
              from: "agents",
              localField: "agentId",
              foreignField: "agentId",
              as: "agentInfo",
            },
          },
          {
            $unwind: "$agentInfo",
          },

          {
            $group: {
              _id: {
                agentId: "$agentId",
                name: "$agentInfo.name",
                month: { month: "$date" },
              },
              averagePerformance: {
                $avg: {
                  $avg: "$performanceMetrics.value",
                },
              },
            },
          },

          {
            $project: {
              _id: 0,
              agentId: "$_id.agentId",
              name: "$_id.name",
              averagePerformance: 1,
            },
          },
          {
            $sort: {
              name: 1,
            },
          },
        ])
        .toArray();
      res.send(data);
    }, next);
  } catch (err) {
    console.error("Error in /call-duration-by-month", err);
    next(err);
  }
});

/**
 * Author: Kylie Struhs
 * Date: 11/10/24
 * File: agent-performance-by-customer-feedback.js
 * Description: Apre agent performance API for the agent performance reports of customer feedback
 */

/**
 * @description
 *
 * GET /agent-id
 *
 * Fetches agent ids
 *
 * Example:
 * fetch('/agent-id')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/agent-id', (req, res, next) => {
  try {
    mongo(async db => {
      const agentIds = await db.collection('agentPerformance').distinct('agentId');
      res.send(agentIds);
    }, next);
  } catch (err) {
    console.error('Error getting agentId: ', err);
    next(err);
  }
});


/**
 * Author: Diana Ruiz Garcia
 * Date: 11/09/24
 * File: agent-performance-by-supervisor.js
 * Description: Apre agent performance API for the agent performance report
 * by supervisor.
 */


/**
 * @description
 *
 * GET /agent-performance-by-supervisor
 *
 * Fetches a list of distinct agent performance supervisors.
 *
 * Example:
 * fetch('/agent-performance-by-supervisor')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/agent-performance-by-supervisor', (req, res, next) => {
  try {
    mongo (async db => {
      const supervisors = await db.collection('agentPerformance').distinct('supervisorId');
      res.send(supervisors);
    }, next);
  } catch (err) {
    console.error('Error getting supervisors: ', err);
    next(err);
  }
});

/**
 * @description
 *
 * GET /agent-performance-by-supervisor/:supervisorId
 *
 * Fetches agent performance data for a specific supervisor.
 *
 * Example:
 * fetch('/agent-performance-by-supervisor/650c1f1e1c9d440000a1b1c3')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
const ObjectId = require('mongodb').ObjectId; // Import ObjectId
router.get('/agent-performance-by-supervisor/:supervisorId', (req, res, next) => {
  try {
    const supervisorId = req.params.supervisorId;

    if (!supervisorId.match(/^[0-9a-fA-F]{24}$/)) {
      return next(createError(400, 'Supervisor ID is required'));
    }

    console.log('Fetching agent performance report for supervisor:', supervisorId);

    mongo (async db => {
      const agentPerformanceReportBySupervisor = await db.collection('agentPerformance').aggregate([
        { $match: { supervisorId: new ObjectId(supervisorId) }},
        {
          $lookup: {
            from: 'agents',
            localField: 'agentId',
            foreignField: 'agentId',
            as: 'agentDetails'
          }
        },
        {
          $unwind: '$agentDetails'
        },
        {
          $group: {
            _id: '$agentDetails.name',
            totalResolutionTime: { $sum: '$resolutionTime'}
          }
        },
        {
          $project: {
            _id: 0,
            agent: '$_id',
            resolutionTime: '$totalResolutionTime'
          }
        },
        {
          $group: {
            _id: null,
            agents: { $push: '$agent' },
            resolutionsTime: { $push: '$resolutionTime' }
          }
        },
        {
          $project: {
            _id: 0,
            agents: 1,
            resolutionsTime: 1
          }
        }
      ]).toArray();
      res.send(agentPerformanceReportBySupervisor);
    }, next);
  } catch (err) {
    console.error('Error getting agent performance data for supervisor: ', err);
    next(err);
  }
});

/*
Author: Sheldon Skaggs

*/
/**
 * @description
 *
 * GET /performance-by-metric/:metricName
 *
 * Fetches call performance data for agents by specified metric.
 *
 * Example:
 * fetch('/performance-by-metric/Sales Conversion')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/performance-by-metric/:metricName', (req, res, next) => {
  // Assign parameter to a variable for easy reference
  const metricName = req.params.metricName;

  // Surround our query in a try-catch for added safety
  try {
    mongo (async db => {
      // Query our database for data related to the desired metric
      const perfDataForMetric = await db.collection('agentPerformance').aggregate([
        // Match on the provided personName
        {
          $match: {
            performanceMetrics: {
              $elemMatch: {
                metricType: metricName
              }
            }
          }
        },
        // Lookup/join on agents
        {
          $lookup: {
            from: "agents",
            localField: "agentId",
            foreignField: "agentId",
            as: "agentDetails"
          }
        },
        // Unwind the agent details
        {
          $unwind: "$agentDetails"
        },
        // Get the agent data
        {
          $group: {
            _id: null,
            agentInfo: {
              $addToSet: {
                // Agent Name
                agentName: "$agentDetails.name",
                // Sum the performance data for the desired metric
                performanceTotals: {
                  // Obtain the performance total so that it is not an array
                  $arrayElemAt: [
                    {
                      // Create an array of the desired metric
                      $map: {
                        input: {
                          // Filter to get the sub-documents of the desired metric
                          $filter: {
                            input:
                              "$performanceMetrics",
                            as: "aMetric",
                            cond: {
                              $eq: [
                                "$$aMetric.metricType",
                                metricName
                              ]
                            }
                          }
                        },
                        as: "desiredMetric",
                        in: {
                          // Total up the performance values of the desired metric
                          $sum: "$$desiredMetric.value"
                        }
                      }
                    },
                    0
                  ]
                }
              }
            }
          }
        },
        // Project the two arrays
        {
          $project: {
            agentNames: "$agentInfo.agentName",
            performanceTotals: "$agentInfo.performanceTotals"
          }
        }


      ]).toArray();
      // Send our results to the response
      res.send(perfDataForMetric);
    }, next);

  } catch (err) {
    // Log the error
    console.error('Error getting performance data by metric', err);
    // Pass our error object to the next middleware
    next(err);
  }
});


/**
 * Author: Brandon Salvemini
 * Date: 11/7/2024
 * File: agent-data-by-region.js
 * Description: Route file for fetching agent performance data by region
 */


/**
 * @description
 *
 * GET /regions
 *
 * Fetches a list of distinct agent performance regions.
 *
 * Example:
 * fetch('/regions')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/regions', (req, res, next) => {
  try {
    mongo (async db => {
      const regions = await db.collection('agentPerformance').distinct('region');
      res.send(regions);
    }, next);
  } catch (err) {
    console.error('Error getting regions: ', err);
    next(err);
  }
});



/**
 * @description
 *
 * GET regions/:region
 *
 * Fetches agent performance data for a given region
 *
 * Example:
 * fetch('/regions/Australia')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/regions/:region', function(req, res, next) {
  try {
    mongo (async db => {
      const agentPerformanceReportByRegion = await db.collection('agentPerformance').aggregate([

        {
          '$match': {
            'region': req.params.region // match on the given region
          }
        }, {
          '$lookup': { // lookup the agent details from the agents collection using the agentID field
            'from': 'agents',
            'localField': 'agentId',
            'foreignField': 'agentId',
            'as': 'agentDetails'
          }
        }, {
          '$addFields': {
            'agentDetails': {
              '$arrayElemAt': [
                '$agentDetails', 0 // get the first entry from the agentDetails array
              ]
            }
          }
        }, {
          '$addFields': {
            'agentDetails': {
              '$ifNull': [
                '$agentDetails', {} // if agentDetails is null, set it to an empty object
              ]
            }
          }
        }, {
          '$unset': [
            '_id', 'performanceMetrics', 'supervisorId' // Remove '_id', 'performanceMetrics', and 'supervisorId' from the result
          ]
        }
      ]).toArray();
      res.send(agentPerformanceReportByRegion);
    }, next);
  } catch (err) {
    console.error('Error getting agent performance data for region: ', err);
    next(err);
  }
});


module.exports = router;
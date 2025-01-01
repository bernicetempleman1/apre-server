/**
 * Author: Bernice Templeman
 * Date: 11 November 2024
 * File: sample-data.js
 * Description: Sample data for Project and Task collections
 *
 * //mongo (clusters , connect )
 * mongodb+srv://<db_username>:<db_password>@bellevueuniversity.lftytpq.mongodb.net/
 *
 * db connection:
 * mongodb+srv://<db_username>:<db_password>@bellevueuniversity.lftytpq.mongodb.net/?retryWrites=true&w=majority&appName=BellevueUniversity
 *
 * //Password01
 */

// require statements
const mongoose = require("mongoose");
const mongodb = require("mongodb")
// Connection to MongoDB
const connectionString =
  "mongodb+srv://apre_user:s3cret@bellevueuniversity.lftytpq.mongodb.net/?retryWrites=true&w=majority&appName=BellevueUniversity";

// database name
const dbName = "tms";

// function  to Connect to the database
async function connectToDatabase() {
  try {
    await mongoose.connect(connectionString, {
      dbName: dbName,
    });
    // log success
    console.log("Connection to the database instance was successful");
    //log error
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
  }
}

connectToDatabase(); // Call the function to connect to the database

// Sample data for Project
const sampleUsers = [
  {
    _id: "650c1f1e1c9d440000a1b1c1",
    username: "jsmith",
    passwordHash:
      "$2a$10$Jz7eJdl33V4oXiB0SAcK5efe5ixE4maQg3UkEFJgSLtteI0.CtgDa",
    email: "jsmith@apre.com",
    role: "supervisor",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2024-08-13T19:00:43.388Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1c2",
    username: "mbrown",
    passwordHash:
      "$2a$10$rClNsKCQd4GxIQsxXLJ.TOEDXZxqnLKLSaKh55dGfrWPqwkue75fG",
    email: "mbrown@apre.com",
    role: "admin",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1c3",
    username: "ldavis",
    passwordHash:
      "$2a$10$gxIHzNqRzubiFFsxK0exGOjaO4Gk7m4XUv/V0T0EWcxr1ThE1lqs2",
    email: "ldavis@apre.com",
    role: "supervisor",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1c4",
    username: "ataylor",
    passwordHash:
      "$2a$10$VmpZCTbjm0CM4Ien.KOT3u9anTZZ.uIqPwbptLtHF8laLAOB5xn/.",
    email: "atyalor@apre.com",
    role: "agent",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2024-11-23T11:53:38.909Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1c5",
    username: "namrepus",
    passwordHash:
      "$2a$10$wiZPJEjo2TzONl5/SwX1iujoUAIO/DyOdT9jqXGvLqyBXt/h9xc4i",
    email: "namrepus@apre.com",
    role: "admin",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2024-08-09T22:13:40.713Z",
  },
];

// Sample data for Task
const sampleSales = [
  {
    _id: "650c1f1e1c9d440000a1b1eb",
    date: "2023-10-11T00:00:00.000Z",
    region: "East",
    product: "Fitness Tracker",
    category: "Wearables",
    customer: "Lambda LLC",
    salesperson: "Matthew Harris",
    channel: "Online",
    amount: 100,
  },
  {
    _id: "650c1f1e1c9d440000a1b1f6",
    date: "2023-10-22T00:00:00.000Z",
    region: "South",
    product: "Portable Projector",
    category: "Electronics",
    customer: "Chi Co",
    salesperson: "Matthew Harris",
    channel: "Retail",
    amount: 300,
  },
  {
    _id: "650c1f1e1c9d440000a1b1e3",
    date: "2023-10-03T00:00:00.000Z",
    region: "East",
    product: "Office Chair Deluxe",
    category: "Furniture",
    customer: "Gamma Inc",
    salesperson: "Michael Johnson",
    channel: "Online",
    amount: 250,
  },
  {
    _id: "650c1f1e1c9d440000a1b1e1",
    date: "2023-10-01T00:00:00.000Z",
    region: "North",
    product: "Laptop Pro 15",
    category: "Electronics",
    customer: "Acme Corp",
    salesperson: "John Doe",
    channel: "Online",
    amount: 1500,
  },
  {
    _id: "650c1f1e1c9d440000a1b1ec",
    date: "2023-10-12T00:00:00.000Z",
    region: "West",
    product: "Digital Camera",
    category: "Electronics",
    customer: "Mu Inc",
    salesperson: "John Doe",
    channel: "Retail",
    amount: 600,
  },
  {
    _id: "650c1f1e1c9d440000a1b1e5",
    date: "2023-10-05T00:00:00.000Z",
    region: "North",
    product: "Gaming Console",
    category: "Electronics",
    customer: "Epsilon Ltd",
    salesperson: "David Wilson",
    channel: "Online",
    amount: 500,
  },
  {
    _id: "650c1f1e1c9d440000a1b1ed",
    date: "2023-10-13T00:00:00.000Z",
    region: "North",
    product: "Laptop Pro 13",
    category: "Electronics",
    customer: "Nu Co",
    salesperson: "Jane Smith",
    channel: "Online",
    amount: 1300,
  },
  {
    _id: "650c1f1e1c9d440000a1b1f3",
    date: "2023-10-19T00:00:00.000Z",
    region: "East",
    product: "Wireless Charger",
    category: "Accessories",
    customer: "Tau Corp",
    salesperson: "Olivia Garcia",
    channel: "Online",
    amount: 40,
  },
  {
    _id: "650c1f1e1c9d440000a1b1e7",
    date: "2023-10-07T00:00:00.000Z",
    region: "East",
    product: "Smartwatch Series 5",
    category: "Wearables",
    customer: "Eta Solutions",
    salesperson: "James Brown",
    channel: "Online",
    amount: 300,
  },
  {
    _id: "650c1f1e1c9d440000a1b1e2",
    date: "2023-10-02T00:00:00.000Z",
    region: "South",
    product: "Smartphone X",
    category: "Electronics",
    customer: "Beta LLC",
    salesperson: "Jane Smith",
    channel: "Retail",
    amount: 800,
  },
];

// Sample data for Project
const sampleAgents = [
  {
    _id: "650c1f1e1c9d440000a1b1d8",
    agentId: 1007,
    name: "Olivia Garcia",
    email: "olivia.garcia@example.com",
    phone: "555-0107",
    region: "West",
    supervisorId: "650c1f1e1c9d440000a1b1c3",
    team: "TeleSales Titans",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1dd",
    agentId: 1012,
    name: "Mia Rodriguez",
    email: "mia.rodriguez@example.com",
    phone: "555-0112",
    region: "North",
    supervisorId: "650c1f1e1c9d440000a1b1c4",
    team: "Call Champions",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1de",
    agentId: 1013,
    name: "Ethan Clark",
    email: "ethan.clark@example.com",
    phone: "555-0113",
    region: "South",
    supervisorId: "650c1f1e1c9d440000a1b1c4",
    team: "Call Champions",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1df",
    agentId: 1014,
    name: "Ava Lewis",
    email: "ava.lewis@example.com",
    phone: "555-0114",
    region: "East",
    supervisorId: "650c1f1e1c9d440000a1b1c4",
    team: "Call Champions",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1d4",
    agentId: 1003,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "555-0103",
    region: "West",
    supervisorId: "650c1f1e1c9d440000a1b1c3",
    team: "TeleSales Titans",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1d6",
    agentId: 1005,
    name: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    phone: "555-0105",
    region: "South",
    supervisorId: "650c1f1e1c9d440000a1b1c3",
    team: "TeleSales Titans",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1d1",
    agentId: 1000,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-0100",
    region: "North",
    supervisorId: "650c1f1e1c9d440000a1b1c3",
    team: "TeleSales Titans",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1dc",
    agentId: 1011,
    name: "Lucas Martinez",
    email: "lucas.martinez@example.com",
    phone: "555-0111",
    region: "West",
    supervisorId: "650c1f1e1c9d440000a1b1c4",
    team: "Call Champions",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1d7",
    agentId: 1006,
    name: "James Brown",
    email: "james.brown@example.com",
    phone: "555-0106",
    region: "East",
    supervisorId: "650c1f1e1c9d440000a1b1c3",
    team: "TeleSales Titans",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1d2",
    agentId: 1001,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "555-0101",
    region: "South",
    supervisorId: "650c1f1e1c9d440000a1b1c3",
    team: "TeleSales Titans",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
];

// Sample data for Project
const sampleCustomerFeedback = [
  {
    _id: "650c1f1e1c9d440000a1b23a",
    date: "2023-10-10T00:00:00.000Z",
    region: "Asia",
    product: "Air Conditioner Z",
    category: "Home Appliances",
    channel: "Online",
    salesperson: "Stanley Hudson",
    customer: "Phyllis Vance",
    rating: 5,
    agentId: 1009,
    feedbackType: "Positive",
    performanceMetrics: 95,
    salesAmount: 2000,
    feedbackLength: 150,
    feedbackSentiment: "Positive",
    feedbackText: "Excellent support!",
    feedbackSource: "Chat",
    feedbackStatus: "Reviewed",
  },
  {
    _id: "650c1f1e1c9d440000a1b23b",
    date: "2023-11-05T00:00:00.000Z",
    region: "South America",
    product: "Refrigerator Y",
    category: "Home Appliances",
    channel: "Retail",
    salesperson: "Angela Martin",
    customer: "Kevin Malone",
    rating: 4,
    agentId: 1010,
    feedbackType: "Positive",
    performanceMetrics: 80,
    salesAmount: 1800,
    feedbackLength: 130,
    feedbackSentiment: "Positive",
    feedbackText: "Very good service.",
    feedbackSource: "Phone",
    feedbackStatus: "Reviewed",
  },
  {
    _id: "650c1f1e1c9d440000a1b23e",
    date: "2023-02-15T00:00:00.000Z",
    region: "North America",
    product: "Gaming Console V",
    category: "Electronics",
    channel: "Online",
    salesperson: "Ryan Howard",
    customer: "Kelly Kapoor",
    rating: 4,
    agentId: 1002,
    feedbackType: "Positive",
    performanceMetrics: 85,
    salesAmount: 1500,
    feedbackLength: 120,
    feedbackSentiment: "Positive",
    feedbackText: "Good, but could be better.",
    feedbackSource: "Phone",
    feedbackStatus: "Reviewed",
  },
  {
    _id: "650c1f1e1c9d440000a1b23c",
    date: "2023-12-15T00:00:00.000Z",
    region: "Africa",
    product: "Washing Machine W",
    category: "Home Appliances",
    channel: "Online",
    salesperson: "Oscar Martinez",
    customer: "Toby Flenderson",
    rating: 5,
    agentId: 1000,
    feedbackType: "Positive",
    performanceMetrics: 90,
    salesAmount: 2200,
    feedbackLength: 140,
    feedbackSentiment: "Positive",
    feedbackText: "Outstanding support!",
    feedbackSource: "Email",
    feedbackStatus: "Reviewed",
  },
  {
    _id: "650c1f1e1c9d440000a1b239",
    date: "2023-09-25T00:00:00.000Z",
    region: "Europe",
    product: "Laptop Pro",
    category: "Computers",
    channel: "Retail",
    salesperson: "Pam Beesly",
    customer: "Dwight Schrute",
    rating: 4,
    agentId: 1008,
    feedbackType: "Positive",
    performanceMetrics: 85,
    salesAmount: 1500,
    feedbackLength: 120,
    feedbackSentiment: "Positive",
    feedbackText: "Good service, but a bit slow.",
    feedbackSource: "Email",
    feedbackStatus: "Reviewed",
  },
  {
    _id: "650c1f1e1c9d440000a1b23d",
    date: "2023-01-25T00:00:00.000Z",
    region: "Australia",
    product: "Smart TV Q",
    category: "Electronics",
    channel: "Retail",
    salesperson: "Meredith Palmer",
    customer: "Creed Bratton",
    rating: 3,
    agentId: 1001,
    feedbackType: "Neutral",
    performanceMetrics: 75,
    salesAmount: 1200,
    feedbackLength: 100,
    feedbackSentiment: "Neutral",
    feedbackText: "Average service.",
    feedbackSource: "Chat",
    feedbackStatus: "Reviewed",
  },
  {
    _id: "650c1f1e1c9d440000a1b238",
    date: "2023-08-14T00:00:00.000Z",
    region: "North America",
    product: "Smartphone X",
    category: "Electronics",
    channel: "Online",
    salesperson: "Michael Scott",
    customer: "Jim Halpert",
    rating: 3,
    agentId: 1007,
    feedbackType: "Neutral",
    performanceMetrics: 70,
    salesAmount: 800,
    feedbackLength: 90,
    feedbackSentiment: "Neutral",
    feedbackText: "Satisfactory, but could be better.",
    feedbackSource: "Phone",
    feedbackStatus: "Reviewed",
  },
  {
    _id: "650c1f1e1c9d440000a1b240",
    date: "2023-04-25T00:00:00.000Z",
    region: "Asia",
    product: "Tablet T",
    category: "Computers",
    channel: "Online",
    salesperson: "Darryl Philbin",
    customer: "Roy Anderson",
    rating: 4,
    agentId: 1004,
    feedbackType: "Positive",
    performanceMetrics: 80,
    salesAmount: 1800,
    feedbackLength: 130,
    feedbackSentiment: "Positive",
    feedbackText: "Very good support.",
    feedbackSource: "Chat",
    feedbackStatus: "Reviewed",
  },
  {
    _id: "650c1f1e1c9d440000a1b241",
    date: "2023-05-30T00:00:00.000Z",
    region: "South America",
    product: "Headphones H",
    category: "Audio",
    channel: "Retail",
    salesperson: "Holly Flax",
    customer: "Jan Levinson",
    rating: 5,
    agentId: 1005,
    feedbackType: "Positive",
    performanceMetrics: 95,
    salesAmount: 2500,
    feedbackLength: 160,
    feedbackSentiment: "Positive",
    feedbackText: "Perfect service!",
    feedbackSource: "Phone",
    feedbackStatus: "Reviewed",
  },
  {
    _id: "650c1f1e1c9d440000a1b23f",
    date: "2023-03-20T00:00:00.000Z",
    region: "Europe",
    product: "Smartwatch S",
    category: "Wearables",
    channel: "Retail",
    salesperson: "Andy Bernard",
    customer: "Erin Hannon",
    rating: 5,
    agentId: 1003,
    feedbackType: "Positive",
    performanceMetrics: 90,
    salesAmount: 2000,
    feedbackLength: 150,
    feedbackSentiment: "Positive",
    feedbackText: "Excellent service!",
    feedbackSource: "Email",
    feedbackStatus: "Reviewed",
  },
];

// Sample data for Project
const sampleAgentPerformance = [
  {
    _id: "650c1f1e1c9d440000a1b1d8",
    agentId: 1007,
    name: "Olivia Garcia",
    email: "olivia.garcia@example.com",
    phone: "555-0107",
    region: "West",
    supervisorId: "650c1f1e1c9d440000a1b1c3",
    team: "TeleSales Titans",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1dd",
    agentId: 1012,
    name: "Mia Rodriguez",
    email: "mia.rodriguez@example.com",
    phone: "555-0112",
    region: "North",
    supervisorId: "650c1f1e1c9d440000a1b1c4",
    team: "Call Champions",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1de",
    agentId: 1013,
    name: "Ethan Clark",
    email: "ethan.clark@example.com",
    phone: "555-0113",
    region: "South",
    supervisorId: "650c1f1e1c9d440000a1b1c4",
    team: "Call Champions",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1df",
    agentId: 1014,
    name: "Ava Lewis",
    email: "ava.lewis@example.com",
    phone: "555-0114",
    region: "East",
    supervisorId: "650c1f1e1c9d440000a1b1c4",
    team: "Call Champions",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1d4",
    agentId: 1003,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "555-0103",
    region: "West",
    supervisorId: "650c1f1e1c9d440000a1b1c3",
    team: "TeleSales Titans",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1d6",
    agentId: 1005,
    name: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    phone: "555-0105",
    region: "South",
    supervisorId: "650c1f1e1c9d440000a1b1c3",
    team: "TeleSales Titans",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1d1",
    agentId: 1000,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-0100",
    region: "North",
    supervisorId: "650c1f1e1c9d440000a1b1c3",
    team: "TeleSales Titans",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1dc",
    agentId: 1011,
    name: "Lucas Martinez",
    email: "lucas.martinez@example.com",
    phone: "555-0111",
    region: "West",
    supervisorId: "650c1f1e1c9d440000a1b1c4",
    team: "Call Champions",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1d7",
    agentId: 1006,
    name: "James Brown",
    email: "james.brown@example.com",
    phone: "555-0106",
    region: "East",
    supervisorId: "650c1f1e1c9d440000a1b1c3",
    team: "TeleSales Titans",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    _id: "650c1f1e1c9d440000a1b1d2",
    agentId: 1001,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "555-0101",
    region: "South",
    supervisorId: "650c1f1e1c9d440000a1b1c3",
    team: "TeleSales Titans",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
];

// Function to create sample data
async function createSampleData() {
  try {
    // Clear existing data
    //await dbName.Users.deleteMany({});
    //await Sales.deleteMany({});
    //await Agents.deleteMany({});
   // await AgentPerformance.deleteMany({});
    //await CustomerFeedback.deleteMany({});

    /* Insert sample projects and store their IDs
    const projectIdMap = {};
    for (const projectData of sampleProjects) {
      const project = new Project(projectData);
      await project.save();
      projectIdMap[project.projectId] = project.projectId;
      console.log("Sample project created:", project);
    }



    // Update sample Users
    const updatedSampleTasks = sampleTasks.map((task) => ({
      ...task,

    }));

    // lof sample data
    console.log("Updated sample tasks:", updatedSampleTasks);


    // Insert updated sample users
    const users = await dbName.Users.insertMany(sampleUsers);
    // log tasks created
    console.log("Sample users created:", users);

    // Insert updated sample agents
    const agents = await Agents.insertMany(sampleAgents);
    // log agents created
    console.log("Sample agents created:", agents);


     // Insert updated sample sales
     const sales = await Sales.insertMany(sampleSales);
     // log sales created
     console.log("Sample sales created:", sales);

     // Insert updated sample agent performance
     const agentPerformance = await AgentPerformance.insertMany(sampleAgentPerformance);
     // log tasks created
     console.log("Sample agent performance created:", agentPerformance);

      // Insert updated sample customer feedback
    const customerFeedback = await CustomerFeedback.insertMany(sampleCustomerFeedback);
    // log tasks created
    console.log("Sample customer feedback created:", customerFeedback);










    // Close the connection
    mongoose.connection.close();

    //log error
  } catch (err) {
    console.error("Error creating sample data", err);
  }
}

// Run the function to create sample data
createSampleData();
 */
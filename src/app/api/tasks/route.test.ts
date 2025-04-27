import { GET, POST } from "@/app/api/tasks/route"; // Import the route handlers
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

const sampleTask1 = {
  title: "Test Task",
  description: "This is a test task",
  status: "OPEN",
  dueDate: new Date(),
};

async function clearDatabase() {
  await prisma.task.deleteMany({}); // Clear the tasks table
}

describe("Task API", () => {
  beforeEach(async () => {
    await clearDatabase(); // Clear database before each test
  });

  afterAll(async () => {
    await prisma.$disconnect(); // Disconnect Prisma after tests
  });

  it("should fetch all tasks successfully", async () => {
    // Create a task
    const postReq = new Request("http://localhost/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sampleTask1),
    });
    const postResponse = await POST(postReq);
    expect(postResponse.status).toBe(201); // POST success!

    // Fetch all tasks
    const getResp = await GET();
    const data = await getResp.json();

    // Assert response
    expect(getResp.status).toBe(200);
    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...sampleTask1,
          id: expect.any(Number), // Auto-incremented ID
          dueDate: expect.any(String),
        }),
      ])
    );
  });

  it("should fail to create task with missing status and dueDate", async () => {
    const req = new Request("http://localhost/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Test Task",
        // missing status and dueDate
      }),
    });

    const response = await POST(req);
    const data = await response.json();

    expect(data.error).toBe("All fields are required");
    expect(response.status).toBe(400);
  });
});

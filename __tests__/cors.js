const app = require("../app");
const request = require("supertest");
const { get } = require("../routes");
const { ExpectationFailed } = require("http-errors");

describe.each(["/orders", "/users", "/records"])("Cors in GET %s", (path) => {
  test("Cor in GET" + path, async () => {
    const testRes = await request(app).get(path);
    // expect(false).toBe(true);
    expect(testRes.headers).toEqual(
      expect.objectContaining({
        "access-control-allow-origin": expect.anything(),
        "access-control-allow-headers": expect.anything(),
        "access-control-allow-methods": expect.stringContaining("GET"),
      })
    );
  });

  test("Content type JSON in GET" + path, async () => {
    const testRes = await request(app).get(path);
    console.log(res.headers);
    expect(res.headers).toEqual(
      expect.objectContaining({
        "content-type": expect.stringContaining("application/json"),
      })
    );
  });
});

beforeAll(async (done) => {
  server = app.listen(3000, () => {
    global.agent = request.agent(server);
    done();
  });
});

afterAll(async () => {
  await server.close();
});

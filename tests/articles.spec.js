const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mockingoose = require("mockingoose");
const Article = require("../api/articles/articles.schema");

describe("Article API", () => {
  let token;
  const USER_ID = "5f8f8c44b54764421b7156d9"; 

  beforeEach(() => {
   
    mockingoose.resetAll();

  
    mockingoose(Article).toReturn({}, 'save');
    mockingoose(Article).toReturn({}, 'findOneAndUpdate');
    mockingoose(Article).toReturn({}, 'findOneAndDelete');

   
    token = jwt.sign({ userId: USER_ID, role: 'admin' }, config.secretJwtToken, { expiresIn: '1h' });
  });

  test("Create Article", async () => {
    const articleData = { title: "New Article", content: "Content of the article", user: USER_ID };
    const res = await request(app)
      .post("/api/articles")
      .send(articleData)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(201);
  });

  test("Update Article", async () => {
    const articleData = { title: "Updated Title" };
    const res = await request(app)
      .put(`/api/articles/${USER_ID}`)
      .send(articleData)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
  });

  test("Delete Article", async () => {
    const res = await request(app)
      .delete(`/api/articles/${USER_ID}`) 
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
});
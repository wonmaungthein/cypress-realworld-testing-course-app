describe("Simple api testing", () => {
    it("Should fetch", () => {
      cy.request("GET", "https://dummyapi.io/explorer").then((response) => {
        expect(response.status).to.eq(200)
      })
    })
    it("Check response limit is 10", () => {
      cy.visit("https://dummyapi.io/explorer")
      cy.intercept({
        path: "/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10",
      }).as("commentsPath")
      cy.get(".flex > :nth-child(5)").click()
      cy.wait("@commentsPath").then((intercept) => {
        cy.log(intercept.response.body.limit)
        expect(intercept.response.body.limit).eq(10)
      })
    })
    it("Check first object id is ", () => {
      cy.visit("https://dummyapi.io/explorer")
      cy.intercept({
        path: "/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10",
      }).as("commentsPath")
      cy.get(".flex > :nth-child(5)").click()
      cy.wait("@commentsPath").then((intercept) => {
        cy.log(intercept.response.body.data[0].id)
        expect(intercept.response.body.data[0].id).to.eq(
          "66f5ca7111c3e076c0f750de"
        )
      })
    })
})

describe("API Testing with Cypress", () => {
    it("Should fetch a list of users", () => {
      cy.request("GET", "https://jsonplaceholder.typicode.com/users").then((response) => {
        cy.log(`Here is the response ${response.body[0]}`)
        // Assert the response status
        expect(response.status).to.eq(200)

        // Assert the response body
        expect(response.body).to.have.length(10) // Assuming 10 users
        expect(response.body[0]).to.have.property("name")
      })
    })
})

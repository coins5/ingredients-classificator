const axios = require('axios').default
const fs = require('fs')

function makeQuery ({ query, variables, graphqlUrl = 'https://graph.listamas.com/v1/graphql' }) {
  const data = JSON.stringify({ query, variables })
  return axios({
    method: 'post',
    url: graphqlUrl,
    data,
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': '6djHs-5d!j*jd_a67ghs-a*ca2cd0asd.5D'
    }
  })
}

async function start () {
  const getIngredients = `query {
    RecipeTemplate {
      title
      ingredients
    }
  }`
  const response = await makeQuery({ query: getIngredients, variables: {} })
  const body = response.data

  let allIngredients = []
  body.data.RecipeTemplate.forEach(rt => {
    rt.ingredients.forEach(i => {
      const line = {
        text: i.ingredient,
        meta: {
          source: rt.title
        }
      }
      allIngredients.push(JSON.stringify(line))
    })
  })

  console.log(allIngredients.slice(0, 10))
  fs.writeFileSync('./ingredients.jsonl', allIngredients.join('\n')) 
  console.log(`Wrote ${allIngredients.length} ingredients`)
}

start()

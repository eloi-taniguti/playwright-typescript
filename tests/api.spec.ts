import { test } from '@playwright/test'

interface Icon {
    "Height": string
    "URL": string
    "Width": string
}

interface Results {
    "FirstURL": string
    "Result": string
    "Text": string
    "Icon": Icon
}

test('Handling a JSON response', async ({ request }) => {
    const res = await request.get('https://api.duckduckgo.com/?q=the+simpsons&format=json')
    const data = await res.json()
    const relatedTopics = data.RelatedTopics
    relatedTopics.forEach(( topic: Results ) => {
      if (topic.Icon.URL) console.log(`Found url in related topics: ${topic.Icon.URL}`)
    })
    const results = data.Results
    results.forEach(( result: Results ) => {
      if (result.Icon.URL) console.log(`Found url in results: ${result.Icon.URL}`)
    })
  
  })
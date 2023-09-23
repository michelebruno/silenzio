const fetch = jest.fn(async () => {
  return {
    json: jest.fn(() => {
      return {
        message: 'Successfully revalidated tags',
        tags: 'test'
      }
    })
  }
})


export default fetch
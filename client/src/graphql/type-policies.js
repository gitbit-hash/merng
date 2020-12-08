const typePolicies = {
  typePolicies: {
    Query: {
      fields: {
        getPosts: {
          merge(existing, incoming) {
            return incoming
          }
        }
      }
    },
    Post: {
      fields: {
        comments: {
          merge(existing, incoming) {
            return incoming
          }
        },
        likes: {
          merge(existing, incoming) {
            return incoming
          }
        }
      }
    }
  }
}

export default typePolicies
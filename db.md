Collections: post
  - ID
  - title
  - slug
  - mage
  - hot (true or false)
  - createAt
  - status: 1(approved) 2(pending) 3(reject)
  - content
  - userId
  - categoryId

Collections : Category
  - id
  - name
  - title
  - slug
  - status: 1(approved) 2(pending)
  - createdAt


Collections : User
  - id
  - displayName
  - email
  - avatar
  - password
  - status: 1(active) 2(pending) 3(ban)
  - role: 1(admin) 2(Mod) 3(User)
  - permissions (optional)
  - createdAt
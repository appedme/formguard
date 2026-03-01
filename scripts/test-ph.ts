import { request, gql } from 'graphql-request';

const token = "MiB76KgDQ7WdObwrW5WUQclcQrGR1Ahop7A45FC8TtM";

const query = gql`
  query {
    post(id: "1086617") {
      id
      name
      tagline
      votesCount
      commentsCount
      websiteUrl
      badges {
        edges {
          node {
            type
          }
        }
      }
    }
  }
`;

async function main() {
  try {
    const data = await request('https://api.producthunt.com/v2/api/graphql', query, {}, {
      Authorization: `Bearer ${token}`
    });
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}

main();

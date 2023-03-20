import { graphql, Link, PageProps } from 'gatsby'
import React from 'react'
import { IoChevronForwardOutline } from 'react-icons/io5'
import styled from '@emotion/styled'
import { GitHubCorner } from '../components/GitHubCorner'

export const pageQuery = graphql`
  {
    allSpecification(sort: { fields: { slug: ASC } }) {
      edges {
        node {
          info {
            title
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

interface Specification {
  info: {
    title: string
  }
  fields: {
    slug: string
  }
}

interface Response {
  allSpecification: {
    edges: Array<{ node: Specification }>
  }
}

export default function Home({
  data: { allSpecification },
}: PageProps<Response>) {
  return (
    <>
      <GitHubCorner />
      <Container>
        <Title>OAS for Korea Open API Services</Title>
        <Paragraph>
          API를 전달하고, 확인하는데 OAS는 널리 쓰이고 있으며, 여러 유용한
          도구를 지원합니다. 공공데이터포털에서도 일부 OAS를 제공하는 것을
          볼 수 있습니다.
        </Paragraph>
        <Paragraph>
          하지만 모든 API가 OAS를 지원하지 않으며, 스펙 또한 다양한 방법으로
          공유되고 있습니다. 이 프로젝트는 여러 Open API의 OAS 파일을
          생성하고, 공유하는 목표로 만들었습니다.
        </Paragraph>
        <ListTitle>목록</ListTitle>
        <div role="list">
          {allSpecification.edges.map(({ node }) => (
            <div key={node.fields.slug} role="listitem">
              <Item role="link" to={`/oas${node.fields.slug}`}>
                {node.info.title}
                <IoChevronForwardOutline size={20} color="#868e96" />
              </Item>
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}

const Title = styled.h1`
  font-size: 2rem;
`

const Paragraph = styled.p`
  word-break: keep-all;
`

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`

const ListTitle = styled.h2`
  font-size: 16px;
  padding-left: 16px;
  color: #868e96;
  margin: 48px 0 8px;
`

const Item = styled(Link)`
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 16px;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  color: black;
  transition: all 0.3s ease 0s;
  &:hover {
    padding: 24px;
    background-color: #f5f5f5;
  }
`

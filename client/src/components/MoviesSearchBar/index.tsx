import React, { useState } from 'react'
import { Row, Col, Input, Button } from 'antd'

interface MoviesSearchProps {
  keyword?: string,
  onSearch?: (keyword: string) => void
}

const MoviesSearchBar: React.FC<MoviesSearchProps> = (props) => {
  const [keyword, setKeyword] = useState(props.keyword || '');

  const handleSearch = () => {
    props.onSearch && props.onSearch(keyword);
  }

  return (
    <Row justify="start" gutter={12}>
      <Col>
        <Input placeholder="筛选：关键词" value={keyword} allowClear
          onChange={e => setKeyword(e.target.value)}
        />
      </Col>
      <Col>
        <Button type="primary" onClick={handleSearch}>查询</Button>
      </Col>
    </Row>
  )
}

export default MoviesSearchBar;

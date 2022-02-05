import React from 'react'
import style from "./index.less"
import { Table, Button, Tag, message } from 'antd';
import MovieService, { Movie } from '@/services/MovieService';
import { TAG_COLORS } from '../common';
import { history } from 'umi';

interface MoviesTableProps {
  movies: Movie[],
  loading: boolean,
  current: number,
  total: number,
  pageSize: number,
  onPageChange: (page: number, pageSize: number) => void
}

const MoviesTable: React.FC<MoviesTableProps> = (props) => {
	const columns = [
		{
			title: '电影名称',
			dataIndex: 'name',
		},
		{
			title: '类型',
			dataIndex: 'types',
			render(types: string[]) {
        const len = types.length;
        return types.map((item, i) => <Tag key={i} color={TAG_COLORS[i % TAG_COLORS.length]}>{item}</Tag>);
			}
		},
		{
			title: '地区',
			dataIndex: 'areas',
			render(types: string[]) {
        return types.map((item, i) => <Tag key={i}>{item}</Tag>);
			}
		},
		{
			title: '时长',
			dataIndex: 'duration',
		},
		{
			title: '即将上映',
			dataIndex: 'isComing',
			render(isComing: boolean) {
				return isComing ? '是' : '否';
			}
		},
		{
			title: '热门',
			dataIndex: 'isHot',
			render(isHot: boolean) {
				return isHot ? '是' : '否';
			}
		},
		{
			title: '经典',
			dataIndex: 'isClassic',
			render(isClassic: boolean) {
				return isClassic ? '是' : '否';
			}
		},
		{
			title: '操作',
			render(curMovie: any) {
				return (
          <>
            <Button type="link" onClick={() => {
							history.push(`/movies/${curMovie._id}`);
            }}>修改</Button>
            <Button type="link" onClick={() => {
							MovieService.delete(curMovie._id).then(res => {
								if(res.err === '') {
									message.success('删除成功', 1);
								}else {
									message.error(`删除失败：${res.err}`, 1);
								}
							});
							location.href = location.pathname;
            }}>删除</Button>
          </>
        )
			}
		}
	];

	return (
		<Table bordered columns={columns} dataSource={props.movies} rowKey="_id" className={style.tableBox}
			loading={props.loading}
			pagination={{
				current: props.current,
				total: props.total,
				pageSize: props.pageSize,
				showSizeChanger: false,
				showQuickJumper: true,
				onChange: props.onPageChange,
				position: ['bottomLeft']
			}}
		/>
	)
}

export default MoviesTable;

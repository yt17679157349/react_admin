import React, { Component } from "react"
import { Card, Button, Table, message, Modal, Select, Input, Spin } from "antd"
import { createFromIconfontCN } from "@ant-design/icons"
import { nanoid } from "nanoid"
import ajax from "../../../../api/ajax"
import "./css/category.less"
import LinkButton from "../../../../components/linkButton/LinkButton"
const IconFont = createFromIconfontCN({
	scriptUrl: "//at.alicdn.com/t/font_2357508_dtut1bryym.js",
})
const { Option } = Select

export default class Category extends Component {
	columns = [
		{
			title: "分类名称",
			dataIndex: "name",
			key: "name",
			width: "75%",
		},
		{
			align: "center",
			title: "操作",
			dataIndex: "_id",
			key: "_id",
			render: (text, record, index) => {
				
				if (this.state.getClassificationListParameter.parentId !== "0") {
					return (
						<>
							<Modal
								title='修改分类'
								visible={this.state.showChangeVisible}
								onOk={(event) => {
									this.changeClassification(event)
								}}
								onCancel={(event) => {
									event.stopPropagation()
									this.setState({ showChangeVisible: false })
								}}
							>
								<Spin spinning={this.state.isShowChangeSpin}>
									<Input
										placeholder='请输入分类名称'
										onChange={(event) => {
											let { changeClassificationParameter } = this.state
											const value = event.target.value
											changeClassificationParameter.categoryName = value
										}}
									></Input>
								</Spin>
							</Modal>
							<LinkButton
								onClick={() => {
								
									let { changeClassificationParameter } = this.state
	
									changeClassificationParameter.categoryId = text
									this.setState({ showChangeVisible: true })
								}}
							>
								修改分类
							</LinkButton>
						</>
					)
				}
				return (
					<>
						<Modal
							title='修改分类'
							visible={this.state.showChangeVisible}
							onOk={(event) => {
								this.changeClassification(event)
							}}
							onCancel={(event) => {
								event.stopPropagation()
								this.setState({ showChangeVisible: false })
							}}
						>
							<Spin spinning={this.state.isShowChangeSpin}>
								<Input
									placeholder='请输入分类名称'
									onChange={(event) => {
										let { changeClassificationParameter } = this.state
										const value = event.target.value
										changeClassificationParameter.categoryName = value
									}}
								></Input>
							</Spin>
						</Modal>
						<LinkButton
							onClick={() => {
								
								let { changeClassificationParameter } = this.state

								changeClassificationParameter.categoryId = text
								this.setState({ showChangeVisible: true })
							}}
						>
							修改分类
						</LinkButton>
						&nbsp;
						<LinkButton
							onClick={() => {
								let getClassificationListParameter = this.state
									.getClassificationListParameter
								getClassificationListParameter.parentId = text
								this.setState({
									getClassificationListParameter,
									subTitle: record.name,
								})
								// console.log(this.state)
								this.getListdata()
							}}
						>
							查看子分类
						</LinkButton>
					</>
				)
			},
		},
	]

	state = {
		listData: [], //一级or二级列表数据

		getClassificationListParameter: {
			//获取一级or二级列表数据的参数
			parentId: "0",
		},
		addclassificationParameter: {
			//添加分类参数
			parentId: "0",
			categoryName: "",
		},
		changeClassificationParameter: {
			//修改分类参数
			categoryId: "",
			categoryName: "",
		},
		subTitle: "", //二级列表标题
		isLoading: false, //是否展示loading效果,
		showAddVisible: false, // 是否展示添加分类对话框
		showChangeVisible: false, // 是否展示修改分类对话框
		isShowAddSpin: false, //正在添加分类loading效果
		isShowChangeSpin: false, //正在修改分类loading效果
	}
	getListdata = async () => {
		this.setState({ isLoading: true })
		const res = await ajax(
			"/manage/category/list",
			this.state.getClassificationListParameter
		)
		if (res.status !== 0) return message.error("列表获取失败!")
		let newres = res.data.map((item) => {
			item.key = nanoid()
			return item
		})
		this.setState({ listData: newres, isLoading: false })
	}
	defaultValue = () => {
		//下拉菜单默认选项
		var { parentId } = this.state.getClassificationListParameter
		if (parentId === "0") {
			return parentId
		} else {
			let { addclassificationParameter } = this.state
			addclassificationParameter.parentId = parentId
			return parentId
		}
	}
	addclassification = async (event) => {
		//确认添加分类列表

		event.stopPropagation()
		let { addclassificationParameter, isShowAddSpin } = this.state
		if (
			addclassificationParameter.categoryName === "" ||
			addclassificationParameter.categoryName.replace(/(^\s*)|(\s*$)/g, "") ===
				""
		)
			return message.error("分类名称不能为空")
		isShowAddSpin = true
		this.setState({ isShowAddSpin })

		const res = await ajax(
			"/manage/category/add",
			addclassificationParameter,
			"POST"
		)
		// console.log(res.status)
		if (res.status !== 0) return message.error("添加失败请稍后重试!")
		this.getListdata()
		this.setState({ showAddVisible: false, isShowAddSpin: false })
	}
	changeClassification = async (event) => {
		//确认修改分类列表
		event.stopPropagation()

		let { changeClassificationParameter, isShowChangeSpin } = this.state

		console.log(this.state.changeClassificationParameter)
		if (
			changeClassificationParameter.categoryName === "" ||
			changeClassificationParameter.categoryName.replace(
				/(^\s*)|(\s*$)/g,
				""
			) === ""
		)
			return message.error("分类名称不能为空")
		isShowChangeSpin = true
		this.setState({ isShowChangeSpin })

		const res = await ajax(
			"/manage/category/update",
			changeClassificationParameter,
			"POST"
		)
		// console.log(res.status)
		console.log(res)
		if (res.status !== 0) return message.error("修改失败请稍后重试!")
		this.getListdata()
		this.setState({ showChangeVisible: false, isShowChangeSpin: false })
	}
	componentDidMount() {
		this.getListdata()
	}

	render() {
		return (
			<div className='category'>
				<Card
					size='small'
					title={
						<div
							style={{
								display: "flex",
								color: "rgba(0, 0, 0, 0.85)",
								fontWeight: "500",
								fontSize: "20px",
							}}
						>
							<LinkButton
								onClick={() => {
									let getClassificationListParameter = this.state
										.getClassificationListParameter
									getClassificationListParameter.parentId = "0"
									this.setState({
										getClassificationListParameter,
										subTitle: "",
									})
									// console.log(this.state)
									this.getListdata()
								}}
							>
								一级分类列表
							</LinkButton>
							<div
								style={
									this.state.subTitle === ""
										? { display: "none" }
										: { display: "block" }
								}
							>
								<IconFont
									type={"iconxiangyou"}
									style={{ fontSize: "24px", margin: "0 10px" }}
								/>
								<span style={{ fontSize: "18px" }}>{this.state.subTitle}</span>
							</div>
						</div>
					}
					extra={
						<Button
							type='primary'
							style={{
								backgroundColor: "#3db389",
								borderColor: "#3db389",
								width: "80px",
								height: "32px",
								borderRadius: "4px",
								padding: "0 15px",
								fontSize: "14px",
							}}
							onClick={() => {
								this.setState({ showAddVisible: true })
							}}
						>
							<IconFont type='iconjia' style={{ fontSize: "12px" }}></IconFont>
							添加
							<Modal
								title='添加分类'
								visible={this.state.showAddVisible}
								onOk={this.addclassification}
								onCancel={(event) => {
									event.stopPropagation()
									this.setState({ showAddVisible: false })
								}}
							>
								<Spin spinning={this.state.isShowAddSpin}>
									<Select
										defaultValue={this.defaultValue()}
										style={{ width: "100%" }}
										onChange={(value) => {
											let { addclassificationParameter } = this.state
											addclassificationParameter.parentId = value
										}}
									>
										<Option value='0'>一级分类列表</Option>
										{this.state.listData.map((item) => {
											return (
												<Option value={item._id} key={item._id}>
													{item.name}
												</Option>
											)
										})}
									</Select>
									<Input
										style={{ marginTop: "30px" }}
										placeholder='请输入分类名称'
										onChange={(event) => {
											let { addclassificationParameter } = this.state
											const value = event.target.value
											addclassificationParameter.categoryName = value
											console.log(
												this.state.addclassificationParameter.categoryName
											)
										}}
									></Input>
								</Spin>
							</Modal>
						</Button>
					}
					headStyle={{
						height: "65px",
						display: "flex",
						alignItems: "center",
						padding: "0 24px",
					}}
					style={{ width: "100% " }}
				>
					<Table
						columns={this.columns}
						dataSource={this.state.listData}
						bordered
						loading={this.state.isLoading}
						pagination={{
							defaultCurrent: 1,
							defaultPageSize: 5,
							total: this.state.listData.length,
							showQuickJumper: true,
						}}
					/>
				</Card>
			</div>
		)
	}
}

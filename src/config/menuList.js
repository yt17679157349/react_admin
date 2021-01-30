let menuList = [
	{
		title: "首页",
		key: "/welcome",
		icon: "iconshouye",
	},
	{
		title: "商品",
		key: "commodity",
		icon: "iconappstore",
		children: [
			{
				title: "品类管理",
				key: "/category",
				icon: "iconfenlei",
			},
			{
				title: "商品管理",
				key: "/goods",
				icon: "icontool",
			},
		],
	},
	{
		title: "用户管理",
		key: "/user",
		icon: "iconyonghu",
	},
	{
		title: "角色管理",
		key: "/role",
		icon: "iconquanxian",
	},
	{
		title: "图形图表",
		key: "chart",
		icon: "icontubiao2",
		children: [
			{ title: "柱形图", key: "/columnar", icon: "iconzhuzhuangtu" },
			{ title: "折线图", key: "/brokenLine", icon: "iconzhexiantu1" },
			{ title: "饼图", key: "/pieChart", icon: "iconbingtu" },
		],
	},
	{
		title: "订单管理",
		key: "/order",
		icon: "icondingdan",
	},
]

export default menuList

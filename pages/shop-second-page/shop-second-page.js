import {request} from "../../utils/request";
export default {
	data() {
		return {
			title: '拼多多',
			searchValue: "",
			searchActionStyle: {
				"position": "absolute",
				"right": "40rpx",
				"overflow": "visible",
				"width": "inherit",
				"line-height": "20rpx",
				"padding": "25rpx",
				"border-radius": "30rpx",
				"background-color": "#feda2a",
				"color": "#59512c"
			},
			features: [],
			shopTypeList: [{name: '推荐', catId: 0}],
			tabCurrent: 0,
			queryParams: {
				cpType: 'pdd',
				page: 1,
				pageSize: 10,
				catId: 0
			},
			loadStatus: 'loadmore',
			list: [],
			searchId: '',
			shopTypeIcon: '',
		}
	},
	onLoad(e) {
		uni.setNavigationBarTitle({
				title: e.title
		});
		this.title = e.title;
		this.queryParams.cpType = e.jumpType;
		// // 加载商城贴图列表
		this.loadMallTexture();
		// // 加载商城分类
		this.loadMallClass();
		// // 加载商品列表
		this.loadGoodsList();
		this.initShopTypeIcon();
	},
	onReachBottom() {
		this.loadmore();
	},
	methods: {
		async loadMallTexture(){
			const result = await request({url: '/program/mall/mallSecondIcon'+this.$u.queryParams(this.queryParams), method: 'GET'});
			if (result.code == 200) {
				if (result.code == 200) {
					this.features = result.data.features;
				}
			}
		},
		async loadMallClass(){
			const result = await request({url: '/program/mall/mallClass'+this.$u.queryParams(this.queryParams), method: 'GET'});
			if (result.code == 200) {
				this.shopTypeList = [...this.shopTypeList,...result.data];
			}
		},
		toSwitch(e){
			this.tabCurrent = e;
			this.queryParams.catId = this.shopTypeList[e].catId;
			this.clickList();
		},
		async loadGoodsList(e){
			if (e) {uni.showLoading({title:"加载中..."})}
			const result = await request({url: '/program/mall/mallList'+this.$u.queryParams(this.queryParams), method: 'GET'});
			if (e) {uni.hideLoading();}
			if (result.code == 200) {
				this.searchId = result.data.searchId;
				this.list = [...this.list,...result.data.goodsList];
				if (this.list.length >= result.total) {
					this.loadStatus = 'nomore';
				}else{
					this.loadStatus = 'loadmore';
				}
			}else{
				this.loadGoodsList(true);
			}
		},
		clickList(){
			this.queryParams.page = 1;
			this.list = [];
			this.loadGoodsList(true);
		},
		numFilter (value) {
			if (0 == value || '' == value || undefined == value) {
				return 0;
			}
			const fenStr = '00' + Number.parseInt(value.toString()).toString()
			return Number.parseFloat(fenStr.replace(/^(\d+?)(\d{2})$/g, '$1.$2'))
		},
		loadmore(){
			if(this.loadStatus == 'nomore') return;
			this.loadStatus = 'loading';
			this.queryParams.page = ++ this.queryParams.page;
			// 数据加载
			setTimeout(() => {
				this.loadGoodsList();
			}, 1000)
		},
		toSearch() {
			wx.navigateTo({
				url: '../HM-search/HM-search'
			})
		},
		goDetail(item){
			wx.navigateTo({
				url: '../shop-detail/shop-detail?goodsId='+item.goodsId+'&searchId='+this.searchId+'&cpType='+this.queryParams.cpType
			})
		},
		initShopTypeIcon(){
			switch(this.queryParams.cpType){
				case 'pdd':
				this.shopTypeIcon = '../../static/shop/pdd_logo.png';
				break;
				case 'jd':
				this.shopTypeIcon = '../../static/shop/jd_logo.ico';
				break;
				case 'wph':
				this.shopTypeIcon = '../../static/shop/wph_logo.png';
				break;
			}
		},
		toPath(e){
			// toType：0 不作任何动作  1 跳转商品列表  2 跳转其它小程序
			if (e.toType == 1) {
				wx.navigateTo({
					url: e.toPath.page_path+'?jumpType='+e.toPath.jumpType+'&title='+e.toPath.title+'&channelType='+e.toPath.channelType
				})
			}else if(e.toType == 2){
				wx.navigateToMiniProgram({
					appId: e.toPath.app_id,
					path: e.toPath.page_path,
					success(res) {
						// 打开成功
					}
				})
			}
		}
	}
}

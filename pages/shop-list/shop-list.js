import {request} from "../../utils/request";
export default {
		data() {
			return {
				couponChecked: false,
				filterIndex: 0,
				priceOrder: 0,
				tabCurrent: 1,
				list: [],
				navbarTitle: '',
				loadStatus: 'loadmore',
				searchId: '',
				jumpType: 'search',
				shopTypeIcon: '',
				fixdTop: 122,
				queryParams: {
					page: 1,
					pageSize: 10,
					cpType: 'pdd',
					searchStr: '',
					withCoupon: '',
					catId: 0,
					sortType: 0,
					channelType: 0,
				},
				scrollHeight: 'height: 1000rpx',
				shopTypeList: [{name: '京东'}, {name: '拼多多'}, {name: '唯品会'}]
			};
		},
		onLoad(opt) {
			this.navbarTitle = opt.title;
			this.queryParams.searchStr = opt.keywords;
			this.jumpType = opt.jumpType;
			if (this.jumpType != 'search') {
				this.queryParams.cpType = opt.jumpType;
				this.queryParams.channelType = opt.channelType;
			}
			this.doSearchList();
			// 动态设置商家图标
			this.initShopTypeIcon();
			// 动态设置scroll的高度
			this.initHeight();
		},
		methods: {
			initHeight(){
				var _this = this
				    uni.getSystemInfo({
				      success: function (res) {
								let info = uni.createSelectorQuery().select(".navbar-wrap");
						　　　  　	info.boundingClientRect(function(data) { //data - 各种参数
						　　　  　	let navbarHeight = data.height;  // 获取元素高度
											_this.fixdTop = 54 + navbarHeight;
											if (_this.jumpType != 'search') {
												_this.fixdTop -= 50;
												const height = res.windowHeight - navbarHeight - 44;
												_this.scrollHeight = 'height: '+height+'px;margin-top: 44px;'
											}else{
												const height = res.windowHeight - navbarHeight - 142;
												_this.scrollHeight = 'height: ' +height+'px;margin-top: 142px;';
											}
						　　    }).exec()
				      }
				    })
						
						 
			},
			tabClick(e){
				if (e === 3) {
					this.priceOrder = this.priceOrder == 0 ? 1 : 0;
				}else{
					this.priceOrder = 0;
				}
				this.filterIndex = e;
				this.clickList();
			},
			couponSwitch(e){
				this.couponChecked = e;
				this.clickList();
			},
			toSearch(e){
				this.queryParams.searchStr = e;
				this.clickList();
			},
			toSwitch(e){
				this.tabCurrent = e;
				if(e == 0){
					this.queryParams.cpType = 'jd';
				}else if(e == 1){
					this.queryParams.cpType = 'pdd';
				}else if(e == 2){
					this.queryParams.cpType = 'wph';
				}
				this.clickList();
			},
			numFilter(value) {
				if (0 == value || '' == value || undefined == value) {
					return 0;
				}
			 const fenStr = '00' + Number.parseInt(value.toString()).toString()
				return Number.parseFloat(fenStr.replace(/^(\d+?)(\d{2})$/g, '$1.$2'))
			},
			clickList(){
				this.queryParams.page = 1;
				this.list = [];
				this.initShopTypeIcon();
				this.doSearchList(true);
			},
			async doSearchList(e){
				if (e) {uni.showLoading({title:"加载中..."})}
				this.queryParams.withCoupon = this.couponChecked ? '0': '1';
				// 获取排序类型
				await this.getSortType();
				let url = '/program/mall/mallList';
				if (this.jumpType != 'search') {
					url = '/program/mall/mallChannelList'
				}
				const result = await request({url: url+this.$u.queryParams(this.queryParams), method: 'GET'});
				if (e) {uni.hideLoading();}
				if (result.code == 200) {
					this.searchId = result.data.searchId;
					this.list = [...this.list,...result.data.goodsList];
					if (this.list.length >= result.data.total) {
						this.loadStatus = 'nomore';
					}else{
						this.loadStatus = 'loadmore';
					}
				}else{
					this.loadGoodsList(true);
				}
			},
			goDetail(item){
				wx.navigateTo({
					url: '../shop-detail/shop-detail?goodsId='+item.goodsId+'&searchId='+this.searchId+'&cpType='+this.queryParams.cpType
				})
			},
			loadmore(){
				if(this.loadStatus == 'nomore') return;
				this.loadStatus = 'loading';
				this.queryParams.page = ++ this.queryParams.page;
				// 数据加载
				setTimeout(() => {
					this.doSearchList();
				}, 1000)
			},
			lower(){
				this.loadmore();
			},
			getSortType(){
				const that = this;
				return new Promise((resolve, reject) => {
					if(that.filterIndex === 0){
						that.queryParams.sortType = 0;// 综合
					}else if(that.filterIndex === 1){
						that.queryParams.sortType = 1;// 销量
					}else if(that.filterIndex === 2){
						that.queryParams.sortType = 2;// 最新
					}else if(that.filterIndex === 3){
						// 价格
						if(that.priceOrder == 1){
							// 升序
							that.queryParams.sortType = 3;
						}else{
							// 降序
							that.queryParams.sortType = 4;
						}
					}
					// 是否过滤无券
					if(that.couponChecked){
						that.queryParams.withCoupon = 1;
					}else{
						that.queryParams.withCoupon = 0;
					}
					resolve(true);
				})
			},
			initShopTypeIcon(){
				switch(this.queryParams.cpType){
					case 'pdd':
					this.shopTypeIcon = '../../static/shop/pdd_logo.png';
					this.tabCurrent = 1;
					break;
					case 'jd':
					this.shopTypeIcon = '../../static/shop/jd_logo.ico';
					this.tabCurrent = 0;
					break;
					case 'wph':
					this.shopTypeIcon = '../../static/shop/wph_logo.png';
					this.tabCurrent = 2;
					break;
				}
			}
		}
	}
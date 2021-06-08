import {request} from "../../utils/request";
export default {
		data() {
			return {
				couponChecked: false,
				filterIndex: 0,
				priceOrder: 0,
				tabCurrent: 1,
				jumpType: 'search',
				list: [],
				loadStatus: 'loadmore',
				searchId: '',
				shopTypeIcon: '',
				queryParams: {
					page: 1,
					pageSize: 10,
					cpType: 'pdd',
					searchStr: '',
					withCoupon: '',
					catId: 0,
					sortType: 0,
				},
				scrollHeight: 'height: 1000rpx',
				shopTypeList: [{name: '京东'}, {name: '拼多多'}, {name: '唯品会'}]
			};
		},
		onLoad(opt) {
			// 动态设置标题
			uni.setNavigationBarTitle({
			　　title:opt.barTitle
			})
			this.queryParams.searchStr = opt.keywords;
			this.jumpType = opt.jumpType;
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
				        const height = res.windowHeight - 150;
						_this.scrollHeight = 'height: ' + (height * 2) + 'rpx'
				      }
				    })
			},
			tabClick(e){
				this.priceOrder = 0;
				if (e === 3) {
					this.priceOrder = this.priceOrder == 0 ? 1 : this.priceOrder == 1 ? 2 : 1;
					console.log(this.priceOrder);
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
				if (0 == value || '' == value) {
					return value;
				}
			 const fenStr = '00' + Number.parseInt(value.toString()).toString()
				return Number.parseFloat(fenStr.replace(/^(\d+?)(\d{2})$/g, '$1.$2'))
			},
			clickList(){
				this.queryParams.page = 1;
				this.list = [];
				this.doSearchList(true);
			},
			async doSearchList(e){
				if (e) {uni.showLoading({title:"加载中..."})}
				this.queryParams.withCoupon = this.couponChecked ? '0': '1';
				// 获取排序类型
				await this.getSortType();
				const result = await request({url: '/program/mall/mallList'+this.$u.queryParams(this.queryParams), method: 'GET'});
				if (e) {uni.hideLoading();}
				if (result.code == 200) {
					this.searchId = result.data.searchId;
					this.list = [...this.list,...result.data.goodsList];
					if (this.list.length >= result.data.total) {
						this.loadStatus = 'nomore';
					}else{
						this.loadStatus = 'loadmore';
					}
				}
			},
			goDetail(item){
				this.$u.route({
					url: 'pages/shop-detail/shop-detail',
					params: {
						"goodsId": item.goodsId,
						"searchId": this.searchId,
						"cpType": this.queryParams.cpType
					}
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
					// 1. 筛选当前选择的商家类型
					switch(that.queryParams.cpType){
						case 'pdd':
						if(that.filterIndex === 0){
							that.queryParams.sortType = 0;// 综合
						}else if(that.filterIndex === 1){
							that.queryParams.sortType = 5;// 销量
						}else if(that.filterIndex === 2){
							that.queryParams.sortType = 11;// 最新
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
						break;
						case 'jd':
						
						break;
						case 'wph':
						
						break;
					}
					resolve(true);
				})
			},
			initShopTypeIcon(){
				switch(this.queryParams.cpType){
					case 'pdd':
					this.shopTypeIcon = '../../static/shop/pdd_logo.png';
					break;
					case 'jd':
					this.shopTypeIcon = '../../static/shop/jd_logo.png';
					break;
					case 'wph':
					this.shopTypeIcon = '../../static/shop/wph_logo.png';
					break;
				}
			}
		}
	}
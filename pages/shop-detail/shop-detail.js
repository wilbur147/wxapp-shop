import {request} from "../../utils/request";
export default {
		data() {
			return {
				item: {},
				queryParams: {},
				collapseHeadStyle: {
					"padding-left": "26rpx",
					"background-color": "#ffffff",
				}
			};
		},
		onLoad(opt) {
			this.queryParams = opt;
			this.getDetail();
		},
		methods: {
			numFilter(value) {
				if (0 == value || '' == value || undefined == value) {
					return value;
				}
				const fenStr = '00' + Number.parseInt(value.toString()).toString()
				return Number.parseFloat(fenStr.replace(/^(\d+?)(\d{2})$/g, '$1.$2'))
			},
			async getDetail(){
				const that = this;
				const result = await request({url: '/program/mall/mallDetail'+this.$u.queryParams(this.queryParams), method: 'GET'});
				if (result.code == 200) {
					this.item = result.data;
					
					// 从新初始话折叠面板
					that.$nextTick(() => {
						that.$refs.collapseView.init();
					})
				}
			},
			async mallTurnChain(){
				uni.showLoading({
					title:"加载中..."
				})
				const result = await request({url: '/program/mall/mallTurnChain'+this.$u.queryParams(this.queryParams), method: 'GET'});
				uni.hideLoading();
				if (result.code == 200) {
					const weapp = result.data.weChatInfo;
					wx.navigateToMiniProgram({
						appId: weapp.app_id,
						path: weapp.page_path,
						success(res) {
							// 打开成功
						}
					})
				}
			}
		}
	}
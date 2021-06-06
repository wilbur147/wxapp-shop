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
			numFilter (value) {
				if (0 == value || '' == value) {
					return value;
				}
				const fenStr = '00' + Number.parseInt(value.toString()).toString()
				return Number.parseFloat(fenStr.replace(/^(\d+?)(\d{2})$/g, '$1.$2'))
			},
			async getDetail(){
				const result = await request({url: '/program/mall/mallDetail'+this.$u.queryParams(this.queryParams), method: 'GET'});
				if (result.code == 200) {
					this.item = result.data;
				}
			},
			async mallTurnChain(){
				const result = await request({url: '/program/mall/mallTurnChain'+this.$u.queryParams(this.queryParams), method: 'GET'});
				if (result.code == 200) {
					console.log(result.data);
					wx.navigateToMiniProgram({
						appId: this.result.app_id,
						path: this.result.page_path,
						success(res) {
							// 打开成功
						}
					})
				}
			}
		}
	}
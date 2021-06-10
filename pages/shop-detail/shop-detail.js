import {request} from "../../utils/request";
export default {
		data() {
			return {
				item: {},
				queryParams: {},
				titleTag: '拼多多',
				couponTop: 35,
				collapseHeadStyle: {
					"padding-left": "26rpx",
					"background-color": "#ffffff",
				}
			};
		},
		onLoad(opt) {
			this.queryParams = opt;
			this.getDetail();
			this.initTitleTag();
		},
		methods: {
			numFilter(value) {
				if (0 == value || '' == value || undefined == value) {
					return 0;
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
						
						// 获取标题高度
						let info = uni.createSelectorQuery().select(".item-title");
				　　　  　info.boundingClientRect(function(data) { //data - 各种参数
						  // 96  60  -36
						  // 72  40  -32
						  // 48  15  -33
						  // 24  0  -24
						  if(data.height < 48){
							  that.couponTop = 0;
						  }else if(data.height >= 48 && data.height < 72){
							  that.couponTop = 15;
						  }else if(data.height >= 72 && data.height < 96){
							  that.couponTop = 40;
						  }else if(data.height >= 96){
							  that.couponTop = 60;
						  }
				　　    }).exec()
					})
					
				}else{
					this.$refs.uToast.show({
						title: '无效商品！',
						type: 'error',
						// url: '/pages/shopping/shopping',
						back: true,
						isTab: true,
						position: 'top'
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
			},
			initTitleTag(){
				switch(this.queryParams.cpType){
					case 'pdd':
					this.titleTag = '拼多多';
					break;
					case 'jd':
					this.titleTag = '京东';
					break;
					case 'wph':
					this.titleTag = '唯品会';
					break;
				}
			}
		}
	}
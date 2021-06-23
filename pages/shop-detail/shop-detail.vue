<template>
	<view class="u-bg-gray">
		<u-toast ref="uToast" />
		<!-- 详情主图 -->
		<!-- <u-image width="100%" height="830rpx" :src="item.img"></u-image> -->
		<u-swiper height="750" :list="item.imges" mode="none" :autoplay="false"></u-swiper>
		<!-- 中间信息 -->
		<view class="price-wrap-box">
			<view class="price-wrap">
				<view class="price-item-prefix">￥</view>
				<view class="price-item">{{numFilter(item.priceAfter)}}</view>
				<view class="price-item-end">券后</view>
				<view class="item-price-origin">￥{{numFilter(item.price)}}</view>
				<view class="item-sale" v-if="item.sales">已售{{item.sales}}笔</view>
			</view>
			<view class="title-wrap" :style="'height:'+boxTitleHe+'px;'">
				<view class="item-cp">{{titleTag}}</view>
				<view class="item-title">{{item.goodsName}}</view>
			</view>
			<view class="item-coupon-wrap" v-if="item.discount>0"  @click="mallTurnChain">
				<view class="app">
				  <view class="wrapper">
					<view class="content">
						<view class="money">
						  <text>¥</text>{{numFilter(item.discount)}}
						</view>
					  <view class='co'>
						<view class='co_w'></view>
						<view class="title">
						  隐藏优惠券
						</view>
						<view class='co_l'></view>
					  </view>
					</view>
					<view class="split-line"></view>
					<view class="tip">
					  <view class="conditions">
						领取时间
					  </view>
					  <view class="get-time">{{$u.timeFormat(item.couponStartTime, 'yyyy.mm.dd')}}-{{$u.timeFormat(item.couponEndTime, 'yyyy.mm.dd')}}</view>
					  <button class="useNow" bindtap="">
					  立即使用
					  </button>
					</view>
				  </view>
				</view>
				<!-- <image style="width: 100%;" src="../../static/shop/coupon.png" mode="widthFix"></image>
				<view class="item-coupon-price">{{numFilter(item.discount)}}</view>
				<view class="item-coupon-time">{{$u.timeFormat(item.couponStartTime, 'yyyy.mm.dd')}}-{{$u.timeFormat(item.couponEndTime, 'yyyy.mm.dd')}}</view> -->
			</view>
		</view>
		
		<!-- 店铺信息 -->
		<view class="shop-info-box">
			<view class="item-shopname u-line-2">{{item.shopName}}</view>
			<view class="avg-wrap">
				<view class="avg-title">宝贝描述 {{item.avgDesc}}</view>
				<u-icon class="avg-icon" :name="item.avgDesc!='低'?'arrow-upward':'arrow-downward'" color="#f04044" size="12"></u-icon>
				<view class="avg-title">卖家服务 {{item.avgLgst}}</view>
				<u-icon class="avg-icon" :name="item.avgLgst!='低'?'arrow-upward':'arrow-downward'" color="#f04044" size="12"></u-icon>
				<view class="avg-title">物流服务 {{item.avgServ}}</view>
				<u-icon class="avg-icon" :name="item.avgServ!='低'?'arrow-upward':'arrow-downward'" color="#f04044" size="12"></u-icon>
			</view>
		</view>
		
		<!-- 商品图片列表 -->
		<view class="shop-picturl-box">
			<u-collapse :head-style="collapseHeadStyle"  ref="collapseView">
				<u-collapse-item title="宝贝详情" :open="true">
					<view v-for="(item,index) in item.imges" :key="index">
						<u-image width="100%" height="750rpx" :src="item"></u-image>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
		
		<!-- 底部功能栏 -->
		<view class="footer-features-box">
			<view class="shop-index-wrap" @click="toShopIndex">
				<view class="item-index-icon">
					<u-icon name="home" color="#5e5e5e" size="60"></u-icon>
				</view>
				<view class="item-index-title">首页</view>
			</view>
			<view class="shop-buy-wrap">
				<view class="shop-btn" @click="mallTurnChain">领券下单</view>
			</view>
		</view>
	</view>
</template>


<script>
	import {request} from "../../utils/request";
	export default {
			data() {
				return {
					item: {},
					queryParams: {},
					titleTag: '拼多多',
					couponTop: 35,
					boxTitleHe: 24,
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
							  that.boxTitleHe = data.height&&data.height>0 ? data.height : 24
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
				toShopIndex(){
					wx.redirectTo({
					    url: '/pagesB/pages/shopping/shopping'
					});
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
</script>
<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
</style>
<style lang="scss" scoped>
	.price-wrap-box{
		background-color: #FFFFFF;
		width: 100vw;
		padding: 26rpx;
		.price-wrap{
			display: flex;
			flex-wrap: wrap;
			position: relative;
			color: #ff3624;
			.price-item-prefix,.price-item,.price-item-end{
				display: flex;
				align-items: flex-end;
				font-weight: 600;
			}
			.price-item{
				font-size: 60rpx;
				line-height: 56rpx;
			}
			
			.item-price-origin,.item-sale {
			    font-size: 20rpx;
			    color: #a9a9a9;
			    font-weight: lighter;
			}
			.item-price-origin{
				display: flex;
				align-items: flex-end;
				text-decoration: line-through;
			}
			.item-sale{
				position: absolute;
				right: 30rpx;
				top: 27rpx;
			}
		}
		
		
		.title-wrap{
			margin-top: 15rpx;
			display: flex;
			flex-wrap: wrap;
			height: 80rpx;
			position: relative;
			.item-cp{
				background-color: #ff3624;
				border-radius: 15rpx;
				padding: 5rpx 12rpx;
				margin-right: 5rpx;
				font-size: 22rpx;
				text-align: center;
				color: #FFFFFF;
				letter-spacing: 3rpx;
				height: 40rpx;
				display: flex;
				align-items: center;
				margin-top: 5rpx;
			}
			.item-title{
				position: absolute;
				left: 11rpx;
				text-indent: 96rpx;
				font-size: 36rpx;
				font-weight: 700;
			}
		}
		
		.item-coupon-wrap{
			// margin-top: 35rpx;
			// width: 100%;
			// position: relative;
			// .item-coupon-price{
			// 	position: absolute;
			// 	top: 31rpx;
			// 	left: 78rpx;
			// 	font-size: 52rpx;
			// 	color: #ffffff;
			// }
			// .item-coupon-time{
			// 	position: absolute;
			// 	top: 72rpx;
			// 	right: 258rpx;
			// 	font-size: 18rpx;
			// 	color: #ebd8d7;
			// }
			.app {
			  padding: 20rpx;
			  background: #eee;
			  margin-top: 20rpx;
			  .wrapper {
			    margin: 0 auto;
			    width: 100%;
				height: 220rpx;
			    display: flex;
			    background:linear-gradient(-90deg,rgba(250,173,82,1),rgba(254,50,103,1));
			    /*实现颜色渐变 */
				
				/*前半部分样式*/
				.content {
				  position: relative;
				  flex: 1;
				  padding: 20rpx 30rpx;
				  text-align: center;
				  
				  
				  .money {
				    font-size: 100rpx;
				    color: #eee;
					text {
					  font-size: 50rpx;
					  padding-right: 20rpx;
					}
				  }
				  
				  .co {
				    padding-top:10rpx;
					.co_w {
					  width: 64rpx;
					  height: 1rpx;
					  background: #fff;
					  margin-bottom: -20rpx;
					}
					
					.title {
					  color: #eee;
					  font-size: 30rpx;
					}
					.co_l {
					  width: 64rpx;
					  height: 1rpx;
					  background: #fff;
					  margin-left: 260rpx;
					  margin-top: -20rpx;
					}
				  }
				}
				
				/*给前半部分加两个伪类，基本样式如下*/.content:before, .content:after{
				    content: '';
				    position: absolute;
				    width: 32rpx;
				    height: 16rpx;
				    background: #eee;
				    left: -16rpx;
				    z-index: 1;
				}
				
				
				/*中间竖直虚线样式*/
				.split-line {
				    position: relative;
				    flex: 0 0 0;
				    margin: 0 10rpx 0 6rpx;
				    border-left: 4rpx dashed #eee;
				}
				
				/*给虚线加两个伪类，基本样式如下*/
				.split-line:before, .split-line:after {
				    content: '';
				    position: absolute;
				    width: 32rpx;
				    height: 16rpx;
				    background: #eee;
				    left: -18rpx;
				    z-index: 1;
				}
				
				/*后半部分样式*/
				.tip {
				  position: relative;
				  padding:  20rpx 60rpx;
				  padding-left: 20rpx;
				  flex: 0 0 300rpx;
				  text-align: center;
				  .conditions {
				    color: #eee;
				    font-size: 30rpx;
				    padding:15rpx;
				  }
				  .get-time{
					  font-size: 20rpx;
					  color: #eee;
				  }
				  .useNow {
					  margin-top: 20rpx;
				    color: rgba(254,50,103,1);
				    font-size: 20rpx;
				    border-radius: 50rpx;
				    border-style: none;
				  }
				}
				
				/*给前半部分加两个伪类，基本样式如下*/
				.tip:before, .tip:after{
				    content: '';
				    position: absolute;
				    width: 32rpx;
				    height: 16rpx;
				    background:#eee;
				    right: 32rpx;
				    z-index: 1;
				}
				
				/*几个伪类化成的圆弧的样式以及位置（置于顶部）我把它放在一起了*/
				.content:before, .tip:before, .split-line:before{
				    border-radius: 0 0 16rpx 16rpx;
				    top: 0;
				}
				
				/*几个伪类化成的圆弧的样式以及位置（置于底部）我把它放在一起了*/
				.content:after, .tip:after, .split-line:after{
				    border-radius: 16rpx 16rpx 0 0;
				    bottom: 0;
				}
			  }
			}
		}
	}
	
	.shop-info-box{
		margin: 24rpx 0;
		background-color: #FFFFFF;
		padding: 26rpx;
		display: flex;
		.item-shopname{
			font-size: 27rpx;
			display: flex;
			flex: 4;
	    font-weight: 700;
		}
		.avg-wrap{
			display: flex;
			flex: 8;
			flex-wrap: wrap;
			.avg-title{
				font-size: 22rpx;
				color: #a9a9a9;
				font-weight: lighter;
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 0 6rpx;
			}
			.avg-icon{
				margin: 0 6rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
	
	.shop-picturl-box{
		margin-bottom: 100rpx;
	}
	
	.footer-features-box{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 110rpx;
		background-color: #FFFFFF;
		display: flex;
		.shop-index-wrap{
			display: flex;
			flex: 3;
			align-items: center;
			justify-content: center;
			flex-flow: column;
			flex-wrap: wrap;
			.item-index-title{
				font-size: 24rpx;
			}
		}
		.shop-buy-wrap{
			display: flex;
			flex: 9;
			justify-content: center;
			align-items: center;
			.shop-btn{
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #f4513d;
				color: #FFFFFF;
				font-size: 44rpx;
				border-radius: 45rpx;
				width: 80%;
				height: 80%;
			}
		}
	}
</style>

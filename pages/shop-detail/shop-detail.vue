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
					uni.redirectTo({
						url: '/pagesB/pages/shopping/shopping'
					})
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
<style lang="scss" scoped src="./shop-detail.scss"></style>

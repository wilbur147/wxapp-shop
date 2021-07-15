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
			<view class="picturl-title-wrap" @click="hidChange">
				<view class="title">宝贝详情</view>
				<u-icon :name="!hidStatus?'arrow-up':'arrow-down'" color="#9a9c92" style="margin-left: 74%;"></u-icon>
			</view>
			<view class="picturl-list-wrap" v-show="!hidStatus">
				<view v-for="(item,index) in item.imges" :key="index">
					<u-image width="100%" height="750rpx" :src="item"></u-image>
				</view>
			</view>
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


<script src="./shop-detail.js"></script>
<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
</style>
<style lang="scss" scoped src="./shop-detail.scss"></style>

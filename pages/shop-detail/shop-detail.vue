<template>
	<view class="u-bg-gray">
		<!-- 详情主图 -->
		<u-image width="100%" height="830rpx" :src="item.img"></u-image>
		
		<!-- 中间信息 -->
		<view class="price-wrap-box">
			<view class="price-wrap">
				<view class="price-item-prefix">￥</view>
				<view class="price-item">{{numFilter(item.priceAfter)}}</view>
				<view class="price-item-end">券后</view>
				<view class="item-price-origin">￥{{numFilter(item.price)}}</view>
				<view class="item-sale">已售{{item.sales||0}}笔</view>
			</view>
			<view class="title-wrap">
				<view class="item-cp">拼多多</view>
				<view class="item-title u-line-2">{{item.goodsName}}</view>
			</view>
			<view class="item-coupon-wrap"  @click="mallTurnChain">
				<image style="width: 100%;" src="../../static/shop/coupon.png" mode="widthFix"></image>
				<view class="item-coupon-price">{{numFilter(item.discount)}}</view>
				<view class="item-coupon-time">{{$u.timeFormat(item.couponStartTime, 'yyyy.mm.dd')}}-{{$u.timeFormat(item.couponEndTime, 'yyyy.mm.dd')}}</view>
			</view>
		</view>
		
		<!-- 店铺信息 -->
		<view class="shop-info-box">
			<view class="item-shopname u-line-2">{{item.shopName}}</view>
			<view class="avg-wrap">
				<view class="avg-title">宝贝描述 {{item.avgDesc}}</view>
				<u-icon class="avg-icon" :name="item.avgDesc!=''?'arrow-upward':'arrow-downward'" color="#f04044" size="12"></u-icon>
				<view class="avg-title">卖家服务 {{item.avgLgst}}</view>
				<u-icon class="avg-icon" :name="item.avgLgst!=''?'arrow-upward':'arrow-downward'" color="#f04044" size="12"></u-icon>
				<view class="avg-title">物流服务 {{item.avgServ}}</view>
				<u-icon class="avg-icon" :name="item.avgServ!=''?'arrow-upward':'arrow-downward'" color="#f04044" size="12"></u-icon>
			</view>
		</view>
		
		<!-- 商品图片列表 -->
		<view class="shop-picturl-box">
			<u-collapse :head-style="collapseHeadStyle"  ref="collapseView">
				<u-collapse-item title="宝贝详情" :open="true">
					<view style="margin-bottom: 10rpx;" v-for="(item,index) in item.imges" :key="index">
						<u-image width="100%" height="750rpx" :src="item"></u-image>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
		
		<!-- 底部功能栏 -->
		<view class="footer-features-box">
			<view class="shop-index-wrap">
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

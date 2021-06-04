<template>
	<view class="u-bg-gray">
		<!-- 导航栏 -->
		<u-navbar :is-back="false" :background="background">
			<view class="slot-wrap">
				<view class="u-flex-c">
					<image class="navbar-images" src="../../static/shop/拼多多logo.png" mode="widthFix"></image>
					<image class="navbar-images" src="../../static/shop/京东logo.png" mode="widthFix"></image>
					<image class="navbar-images" src="../../static/shop/唯品会logo.png" mode="widthFix"></image>
				</view>
				<view class="navbar-title">
					购物领券全场优惠
				</view>
			</view>
		</u-navbar>
		<!-- 搜索框 -->
		<u-search v-model="searchValue" placeholder="输入商品名称或粘贴标题" :clearabled="false" margin="30rpx 20rpx"
			:show-action="true" border-color="#FA3534" :disabled="true" @click="toSearch"
			:action-style="searchActionStyle" action-text="搜索优惠券" input-style="position: relative;">
		</u-search>
		<!-- 商品广告图 -->
		<view style="text-align: center;">
			<image src="../../static/shop/o_1f73id996g9mfok1bc4tsg51312.png" mode="widthFix" class="ad-image"></image>
		</view>
		<view class="section">
			<view class="section-bottom">
				<scroll-view class="scroll-view_X" scroll-x="true">
					<view v-for="(item, index) in adImagesList" :key="index" class="section-bottom-item"
						@tap="toOtherMiniPrograms" :data-index="index">
						<image :src="item.icon" mode="aspectFit"></image>
						<!-- <text>{{item.name}}</text> -->
					</view>
				</scroll-view>
			</view>
		</view>

		<!-- 中部推销图 -->
		<view class="wrap" style="padding: 22rpx 18rpx;">
			<u-row>
				<u-col span="5">
					<image src="../../static/shop/o_1f2j4g85brqh8cl1jg916n2ung17.png" mode="widthFix"
						class="first-image"></image>
				</u-col>
				<u-col span="7">
					<u-row class="goods-to-wrap">
						<image src="../../static/shop/o_1f2j4gkvf1uuu14f01c9uids81n1c.png" mode="widthFix"
							class="second-image"></image>
					</u-row>
					<u-row style="position: relative;">
						<image src="../../static/shop/o_1f2j4h3upn5b158ludf16bhqmp1h.png" mode="widthFix"
							class="third-image"></image>
					</u-row>
				</u-col>
			</u-row>
		</view>
		<!-- 商品广告图 -->
		<view style="text-align: center;">
			<image src="../../static/shop/o_1f5il8ed71bs913pta30ttakp612.gif" mode="widthFix" class="ad-image"></image>
		</view>

		<!-- 分类商品分隔栏 -->
		<view class="sell-wrap">
			<u-row :gutter="100">
				<u-col :span="4">
					<view class="type-title">拼多多</view>
					<view class="type-desc type-active">精选宝贝</view>
				</u-col>
				<u-col :span="4">
					<view class="type-title">京东</view>
					<view class="type-desc">件件必抢</view>
				</u-col>
				<u-col :span="4">
					<view class="type-title">唯品会</view>
					<view class="type-desc">品牌特卖</view>
				</u-col>
			</u-row>
		</view>

		<!-- 商品信息列表 -->
		<view class="item-list">
		    <block v-if="list&&list.length">
				<view @click="toShopDetail" class="item-item" v-for="(item,index) in list" :key="index">
					<u-lazy-load class="item-thumbnail" :image="item.picurl" threshold="300"></u-lazy-load>
					<!-- <image class="item-shop-type" :src="item.shopTypeIcon"></image> -->
					<view class="item-title">{{item.goods_name}}</view>
					<view class="item-price-box">
					    <view class="item-price-prefix">￥</view>
					    <view class="item-price">{{item.price_after}}</view>
					</view>
					<view class="item-coupon-box" v-if="item.discount&&item.discount>0">
					    <image src="../../static/shop/img_coupon.png" style="width:100%;height:100%"></image>
					    <view class="item-coupon-prefix">券</view>
					    <view class="item-coupon-price">{{item.discount||0}}元</view>
					</view>
					<view class="item-line"></view>
					<view class="item-price-origin">￥{{item.price}}</view>
					<view class="item-sale" v-f="item.sales>0">已售{{item.sales}}笔</view>
					<view class="item-money-earn" style="background-color: #FFE262;color: #2D2D2D;">领券下单</view>
				</view>
				<u-loadmore style="margin: auto;" :status="loadStatus" font-size="34" @loadmore="loadmore"/>
		    </block>
			<block v-else>
			    <u-empty style="margin: 30rpx auto;" text="数据为空" mode="data"></u-empty>
			</block>
		</view>
	</view>
</template>

<script src="./shopping.js"></script>
<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
</style>
<style lang="scss" scoped src="./shopping.scss"></style>

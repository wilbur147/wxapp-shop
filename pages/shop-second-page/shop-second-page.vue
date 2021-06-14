<template>
	<view>
		<!-- 顶部 -->
		<view class="top-wrap">
			<view class="title-wrap">
				<view class="item-image">
					<image v-if="queryParams.cpType == 'pdd'" src="../../static/shop/pdd_logo.png" mode="widthFix"></image>
					<image v-if="queryParams.cpType == 'jd'" src="../../static/shop/jd_logo_1.png" mode="widthFix"></image>
					<image v-if="queryParams.cpType == 'wph'" src="../../static/shop/wph_logo.png" mode="widthFix"></image>
				</view>
				<view class="item-text-wrap">
					<view class="text-top">{{title}}全网优惠</view>
					<view class="text-bottom">领券下单一年省千元</view>
				</view>
			</view>
			<!-- 搜索框 -->
			<u-search v-model="searchValue" placeholder="输入商品名称或粘贴标题" :clearabled="false" margin="30rpx 20rpx"
				:show-action="true" border-color="#feda2a" :disabled="true" @click="toSearch" height="86"
				:action-style="searchActionStyle" action-text="搜索优惠券" input-style="position: relative;">
			</u-search>
			<view class="step-wrap">
				<view class="num">1</view>
				<view class="text">领取大额优惠券</view>
				<view class="num">2</view>
				<view class="text">下单购物</view>
			</view>
		</view>
		<!-- 中部功能图 -->
		<view class="section"  v-show="features">
			<view class="section-bottom">
				<scroll-view class="scroll-view_X" scroll-x="true">
					<view v-for="(item, index) in features" :key="index" class="section-bottom-item">
						<image :src="item.src" @click="toPath(item)" mode="aspectFit"></image>
						<view class="name" v-if="item.toPath&&item.toPath.title">{{item.toPath.title}}</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 分类 -->
		<view class="shop-type-box" style="width: 100%;background-color: #FFFFFF;">
			<u-tabs-swiper :list="shopTypeList"
			active-color="#ff6052" inactive-color="#757575" 
			font-size="26" :current="tabCurrent" gutter="50"
			bar-width="40" bar-height="4"
			@change="toSwitch"></u-tabs-swiper>
		</view>
		<!-- 商品信息列表 -->
		<view class="item-list">
		    <block v-if="list&&list.length">
				<view  @click="goDetail(item)" class="item-item" v-for="(item,index) in list" :key="index">
					<u-lazy-load class="item-thumbnail" :image="item.img" threshold="300"></u-lazy-load>
					<image class="item-shop-type" :src="shopTypeIcon"></image>
					<view class="item-title">{{item.goodsName}}</view>
					<view class="item-price-box">
					    <view class="item-price-prefix">￥</view>
					    <view class="item-price">{{numFilter(item.priceAfter)}}</view>
					</view>
					<view class="item-coupon-box" v-if="item.discount>0">
					    <image src="../../static/shop/img_coupon.png" style="width:100%;height:100%"></image>
					    <view class="item-coupon-prefix">券</view>
					    <view class="item-coupon-price">{{numFilter(item.discount)}}</view>
					</view>
					<view class="item-line"></view>
					<view class="item-price-origin">￥{{numFilter(item.price)}}</view>
					<view class="item-sale"  v-if="item.sales">已售{{item.sales || 0}}笔</view>
					<view class="item-money-earn" style="background-color: #feda2a;color: #2D2D2D;">领券下单</view>
				</view>
				<u-loadmore style="margin: auto;" :status="loadStatus" font-size="26" @loadmore="loadmore"/>
		    </block>
			<block v-else>
			    <u-empty style="margin: 30rpx auto;" text="数据为空" mode="data"></u-empty>
			</block>
		</view>
	</view>
</template>

<script src="./shop-second-page.js"></script>
<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: #f6f6f6;
	}
</style>
<style lang="scss" scoped src="./shop-second-page.scss"></style>

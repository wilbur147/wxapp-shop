<template>
	<view class="u-bg-gray">
		<!-- 搜索框 -->
		<view class="search-box" v-if="jumpType == 'search'">
			<u-search v-model="queryParams.searchStr" placeholder="输入宝贝关键字" :clearabled="true" margin="30rpx 20rpx"
			:show-action="true" action-text="搜索" :animation="false"
			 @custom="toSearch">
			</u-search>
		</view>
		<!-- shopType -->
		<view class="shop-type-box">
			<u-tabs-swiper :list="shopTypeList" is-scroll="true" 
			active-color="#ff6052" inactive-color="#757575" 
			font-size="32" :current="tabCurrent" swiperWidth="750" gutter="160"
			bar-width="60" bar-height="4"
			@change="toSwitch"></u-tabs-swiper>
			<!-- <view class="shop-item" @click="toSwitch('jd')">京东</view>
			<view class="shop-item" @click="toSwitch('pdd')">拼多多</view>
			<view class="shop-item" @click="toSwitch('wph')">唯品会</view> -->
		</view>
		<!-- navbar -->
		<view class="navbar">
			<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
				综合
			</view>
			<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
				销量
			</view>
			<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">
				最新
			</view>
			<view class="nav-item" :class="{current: filterIndex === 3}" @click="tabClick(3)">
				<text style="margin-right: 6rpx;">价格</text>
				<view class="p-box">
					<u-icon name="arrow-up" :color="priceOrder == 1 ? '#ff6052' : ''" size="14"></u-icon>
					<u-icon name="arrow-down" :color="priceOrder == 2 ? '#ff6052' : ''" size="14"></u-icon>
				</view>
			</view>
			<view class="nav-item" style="flex: 2;">
				<text style="margin-right: 10rpx;">过滤无券</text>
				<u-switch v-model="couponChecked" @change="couponSwitch" active-color="#ff6052" inactive-color="#eee"></u-switch>
			</view>
		</view>
		<!-- 商品信息列表 -->
		<scroll-view scroll-y="false" :style="scrollHeight" class="scroll-Y" @scrolltolower="lower">
			<view class="item-list" :style="scrollHeight">
				<block v-if="list&&list.length">
					<view  @click="goDetail(item)" class="item-item" v-for="(item,index) in list" :key="index">
						<u-lazy-load class="item-thumbnail" :image="item.img" threshold="300"></u-lazy-load>
						<image class="item-shop-type" :src="shopTypeIcon"></image>
						<view class="item-title">{{item.goodsName}}</view>
						<view class="item-price-box">
						    <view class="item-price-prefix">￥</view>
						    <view class="item-price">{{numFilter(item.priceAfter)}}</view>
						</view>
						<view class="item-coupon-box">
						    <image src="../../static/shop/img_coupon.png" style="width:100%;height:100%"></image>
						    <view class="item-coupon-prefix">券</view>
						    <view class="item-coupon-price">{{numFilter(item.discount)}}元</view>
						</view>
						<view class="item-line"></view>
						<view class="item-price-origin">￥{{numFilter(item.price)}}</view>
						<view class="item-sale" v-f="item.sales>0">已售{{item.sales}}笔</view>
						<view class="item-money-earn" style="background-color: #ff6052;color: #FFFFFF;">领券下单</view>
					</view>
					<u-loadmore style="margin: auto;" :status="loadStatus" font-size="34" @loadmore="loadmore"/>
				</block>
				<block v-else>
				    <u-empty style="margin: 200rpx auto;" text="数据为空" mode="data"></u-empty>
				</block>	
					
			</view>
		</scroll-view>
	</view>
</template>


<script src="./shop-list.js"></script>
<style lang="scss" scoped src="./shop-list.scss"></style>

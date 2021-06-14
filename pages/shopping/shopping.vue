<template>
	<view class="u-bg-gray">
		<!-- 导航栏 -->
		<u-navbar :is-back="false" :background="background">
			<view class="slot-wrap">
				<view class="u-flex-c">
					<image class="navbar-images" src="/static/shop/pdd_logo_1.png" mode="widthFix"></image>
					<image class="navbar-images" src="/static/shop/jd_logo_1.png"  mode="widthFix"></image>
					<image class="navbar-images" src="/static/shop/wph_logo_1.png" mode="widthFix"></image>
				</view>
				<view class="navbar-title">
					购物领券全场优惠
				</view>
			</view>
		</u-navbar>
		<!-- 搜索框 -->
		<u-search v-model="searchValue" placeholder="输入商品名称或粘贴标题" :clearabled="false" margin="30rpx 20rpx"
			:show-action="true" border-color="#feda2a" :disabled="true" @click="toSearch" height="86"
			:action-style="searchActionStyle" action-text="搜索优惠券" input-style="position: relative;">
		</u-search>
		<!-- 商品广告图 -->
		<view style="text-align: center;" v-if="adOne">
			<image :src="adOne.src" @click="toPath(adOne.item)" mode="widthFix" class="ad-image"></image>
		</view>
		<view class="section"  v-if="features">
			<view class="section-bottom">
				<scroll-view class="scroll-view_X" scroll-x="true">
					<view v-for="(item, index) in features" :key="index" class="section-bottom-item">
						<image :src="item.src" @click="toPath(item)" mode="aspectFit"></image>
					</view>
				</scroll-view>
			</view>
		</view>

		<!-- 中部推销图 -->
		<view class="tx-wrap"  v-if="bigAdImges">
			<image :src="bigAdImges[0].src" @click="toPath(bigAdImges[0])" mode="widthFix"
				class="first-image"></image>
			<image :src="bigAdImges[1].src" @click="toPath(bigAdImges[1])" mode="widthFix"
				class="second-image"></image>
			<image :src="bigAdImges[2].src" @click="toPath(bigAdImges[2])" mode="widthFix"
				class="third-image"></image>
		</view>
		<!-- 商品广告图 -->
		<view style="text-align: center;"  v-if="adSecond">
			<image :src="adSecond.src" @click="toPath(adSecond.item)" mode="widthFix" class="ad-image"></image>
		</view>

		<!-- 分类商品分隔栏 -->
		<view class="sell-wrap">
			<u-row :gutter="100">
				<u-col :span="4">
					<view class="type-title" @click="switchCpType('pdd')">拼多多</view>
					<view class="type-desc" :class="{active: queryParams.cpType == 'pdd'}">精选宝贝</view>
				</u-col>
				<u-col :span="4">
					<view class="type-title" @click="switchCpType('jd')">京东</view>
					<view class="type-desc" :class="{active: queryParams.cpType == 'jd'}">件件必抢</view>
				</u-col>
				<u-col :span="4">
					<view class="type-title" @click="switchCpType('wph')">唯品会</view>
					<view class="type-desc" :class="{active: queryParams.cpType == 'wph'}">品牌特卖</view>
				</u-col>
			</u-row>
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
					<view class="item-money-earn" style="background-color: #FFE262;color: #2D2D2D;">领券下单</view>
				</view>
				<u-loadmore style="margin: auto;width: 100%;" :status="loadStatus" font-size="26" @loadmore="loadmore"/>
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

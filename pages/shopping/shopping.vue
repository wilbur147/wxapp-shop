<template>
	<view class="u-bg-gray">
		<!-- 导航栏 -->
		<u-navbar :is-back="false":background="background">
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
		<u-search v-model="searchValue" placeholder="输入商品名称或粘贴标题" :clearabled="false"
		margin="30rpx 20rpx" :show-action="true" border-color="#FA3534"
		:disabled="true" @click ="toSearch"
		:action-style="searchActionStyle" action-text="搜索优惠券"
		input-style="position: relative;"
		>
		</u-search>
		<!-- 商品广告图 -->
		<view style="text-align: center;">
			<image src="../../static/shop/o_1f73id996g9mfok1bc4tsg51312.png" mode="widthFix" class="ad-image"></image>
		</view>
		<view class="section">
		  <view class="section-bottom">
				<scroll-view class="scroll-view_X" scroll-x="true">
					<view v-for="(item, index) in adImagesList" :key="index" class="section-bottom-item" @tap="toOtherMiniPrograms" :data-index="index">
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
					<image src="../../static/shop/o_1f2j4g85brqh8cl1jg916n2ung17.png" mode="widthFix" class="first-image"></image>
				</u-col>
				<u-col span="7">
					<u-row class="goods-to-wrap">
						<image src="../../static/shop/o_1f2j4gkvf1uuu14f01c9uids81n1c.png" mode="widthFix" class="second-image"></image>
					</u-row>
					<u-row style="position: relative;">
						<image src="../../static/shop/o_1f2j4h3upn5b158ludf16bhqmp1h.png" mode="widthFix" class="third-image"></image>
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
				<u-col :span="4" >
					<view class="type-title">京东</view>
					<view class="type-desc">件件必抢</view>
				</u-col>
				<u-col :span="4" >
					<view class="type-title">唯品会</view>
					<view class="type-desc">品牌特卖</view>
				</u-col>
			</u-row>
		</view>
		
		<!-- 商品信息列表 -->
		<view class="goods-list">
			<view class="wrap">
					<u-waterfall v-model="flowList" ref="uWaterfall">
						<template v-slot:left="{leftList}">
							<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
								<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
								<view class="demo-title u-line-2">
									{{item.title}}
								</view>
								<view class="demo-price">
									￥{{item.price}}元
								</view>
								<!-- <view class="demo-tag">
									<view class="demo-tag-owner">
										自营
									</view>
									<view class="demo-tag-text">
										放心购
									</view>
								</view> -->
								<view class="demo-shop">
									{{item.shop}}
								</view>
							</view>
						</template>
						<template v-slot:right="{rightList}">
							<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
								<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
								<view class="demo-title u-line-2">
									{{item.title}}
								</view>
								<view class="demo-price">
									￥{{item.price}}元
								</view>
								<!-- <view class="demo-tag">
									<view class="demo-tag-owner">
										自营
									</view>
									<view class="demo-tag-text">
										放心购
									</view>
								</view> -->
								<view class="demo-shop">
									{{item.shop}}
								</view>
							</view>
						</template>
					</u-waterfall>
					<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
				</view>
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
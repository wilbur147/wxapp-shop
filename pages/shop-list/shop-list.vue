<template>
	<view class="u-bg-gray">
		<!-- 搜索框 -->
		<u-search v-model="searchValue" placeholder="输入宝贝关键字" :clearabled="true" margin="30rpx 20rpx"
			 @click="toSearch">
		</u-search>
		<!-- navbar -->
		<view class="navbar">
			<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
				综合
			</view>
			<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
				销量
			</view>
			<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(2)">
				最新
			</view>
			<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(3)">
				<text style="margin-right: 6rpx;">价格</text>
				<view class="p-box">
					<u-icon name="arrow-up" :color="priceOrder === 1 && filterIndex === 3 ? '#ff6052' : ''" size="14"></u-icon>
					<u-icon name="arrow-down" :color="priceOrder === 2 && filterIndex === 3 ? '#ff6052' : ''" size="14"></u-icon>
				</view>
			</view>
			<view class="nav-item" style="flex: 2;" :class="{current: filterIndex === 2}" @click="tabClick(4)">
				<text style="margin-right: 10rpx;">过滤无券</text>
				<u-switch v-model="couponChecked" active-color="#ff6052" inactive-color="#eee"></u-switch>
			</view>
		</view>
	</view>
</template>


<script src="./shop-list.js"></script>
<style>
	/* page不能写带scope的style标签中，否则无效 */
	/* page {
		background-color: rgb(240, 240, 240);
	} */
</style>
<style lang="scss" scoped src="./shop-list.scss"></style>

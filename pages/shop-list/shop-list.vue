<template>
	<view class="u-bg-gray">
		<!-- 导航栏 -->
		<u-navbar class="navbar-wrap">
			<view class="slot-wrap">
				<view class="navbar-title">
					{{navbarTitle}}
				</view>
			</view>
		</u-navbar>
		<!-- 搜索框 -->
		<view class="search-box" :style="{ top: `${fixdTop - 55}px`, }" v-if="jumpType == 'search'">
			<u-search v-model="queryParams.searchStr" placeholder="输入宝贝关键字" :clearabled="true" margin="30rpx 20rpx"
				:show-action="true" action-text="搜索" :animation="false" @custom="toSearch" @search="toSearch">
			</u-search>
		</view>
		<!-- shopType -->
		<view class="shop-type-box" :style="'top: '+fixdTop+'px;'" v-show="jumpType == 'search'">
			<u-tabs-swiper :list="shopTypeList" is-scroll="true" active-color="#ff6052" inactive-color="#757575"
				font-size="32" :current="tabCurrent" swiperWidth="750" gutter="160" bar-width="60" bar-height="4"
				@change="toSwitch"></u-tabs-swiper>
		</view>
		<!-- navbar -->
		<view class="navbar" :style="{ top: `${jumpType == 'search' ? fixdTop + 50 : fixdTop}px`, }">
			<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
				综合 
			</view>
			<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
				销量
			</view>
			<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">
				最新
			</view>
			<view class="nav-item" @click="tabClick(3)">
				<text style="margin-right: 6rpx;" :class="{itemCurrent: filterIndex === 3}">价格</text>
				<view class="p-box">
					<u-icon name="arrow-up" :color="priceOrder === 1 && filterIndex === 3 ? '#ff6052' : ''" size="14">
					</u-icon>
					<u-icon name="arrow-down" :color="priceOrder === 0 && filterIndex === 3 ? '#ff6052' : ''" size="14">
					</u-icon>
				</view>
			</view>
			<view class="nav-item" style="flex: 2;" v-if="queryParams.cpType != 'wph' && jumpType == 'search'">
				<text style="margin-right: 10rpx;">过滤无券</text>
				<u-switch v-model="couponChecked" @change="couponSwitch" active-color="#ff6052" inactive-color="#eee">
				</u-switch>
			</view>
			<view class="nav-item" style="flex: 2;" v-else-if="queryParams.cpType != 'jd' && jumpType != 'search'">
				<text style="margin-right: 10rpx;">过滤无券</text>
				<u-switch v-model="couponChecked" @change="couponSwitch" active-color="#ff6052" inactive-color="#eee">
				</u-switch>
			</view>
		</view>
		<!-- 商品信息列表 -->
		<scroll-view scroll-y="false" :style="scrollHeight" class="scroll-Y" @scrolltolower="lower">
			<view class="item-list">
				<block v-if="list&&list.length">
					<view @click="goDetail(item)" class="item-item" v-for="(item,index) in list" :key="index">
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
						<view class="item-sale" v-if="item.sales">已售{{item.sales || 0}}笔</view>
						<view class="item-money-earn" style="background-color: #ff6052;color: #FFFFFF;">领券下单</view>
					</view>
					<u-loadmore style="margin: auto;width: 100%;" :status="loadStatus" font-size="26"
						@loadmore="loadmore" />
				</block>
				<block v-else>
					<u-empty style="margin: 200rpx auto;" text="数据为空" mode="data"></u-empty>
				</block>

			</view>
		</scroll-view>
	</view>
</template>


<script>
	import {
		request
	} from "../../utils/request";
	export default {
		data() {
			return {
				couponChecked: false,
				filterIndex: 0,
				priceOrder: 0,
				tabCurrent: 1,
				list: [],
				navbarTitle: '',
				loadStatus: 'loadmore',
				searchId: '',
				jumpType: 'search',
				shopTypeIcon: '',
				fixdTop: 122,
				queryParams: {
					page: 1,
					pageSize: 10,
					cpType: 'pdd',
					searchStr: '',
					withCoupon: '',
					catId: 0,
					sortType: 0,
					channelType: 0,
				},
				scrollHeight: 'height: 1000rpx',
				shopTypeList: [{
					name: '京东'
				}, {
					name: '拼多多'
				}, {
					name: '唯品会'
				}]
			};
		},
		onLoad(opt) {
			this.navbarTitle = opt.title;
			this.queryParams.searchStr = opt.keywords;
			this.jumpType = opt.jumpType;
			if (this.jumpType != 'search') {
				this.queryParams.cpType = opt.jumpType;
				this.queryParams.channelType = opt.channelType;
			}
			this.doSearchList();
			// 动态设置商家图标
			this.initShopTypeIcon();
			// 动态设置scroll的高度
			this.initHeight();
		},
		methods: {
			initHeight() {
				var _this = this
				uni.getSystemInfo({
					success: function(res) {
						let info = uni.createSelectorQuery().select(".navbar-wrap");
						info.boundingClientRect(function(data) { //data - 各种参数
							let navbarHeight = data.height; // 获取元素高度
							_this.fixdTop = 54 + navbarHeight;
							if (_this.jumpType != 'search') {
								_this.fixdTop -= 50;
								const height = res.windowHeight - navbarHeight - 44;
								_this.scrollHeight = 'height: ' + height + 'px;margin-top: 44px;'
							} else {
								const height = res.windowHeight - navbarHeight - 142;
								_this.scrollHeight = 'height: ' + height + 'px;margin-top: 142px;';
							}
						}).exec()
					}
				})


			},
			tabClick(e) {
				if (e === 3) {
					this.priceOrder = this.priceOrder == 0 ? 1 : 0;
				} else {
					this.priceOrder = 0;
				}
				this.filterIndex = e;
				this.clickList();
			},
			couponSwitch(e) {
				this.couponChecked = e;
				this.clickList();
			},
			toSearch(e) {
				this.queryParams.searchStr = e;
				this.clickList();
			},
			toSwitch(e) {
				this.tabCurrent = e;
				if (e == 0) {
					this.queryParams.cpType = 'jd';
				} else if (e == 1) {
					this.queryParams.cpType = 'pdd';
				} else if (e == 2) {
					this.queryParams.cpType = 'wph';
				}
				this.clickList();
			},
			numFilter(value) {
				if (0 == value || '' == value || undefined == value) {
					return 0;
				}
				const fenStr = '00' + Number.parseInt(value.toString()).toString()
				return Number.parseFloat(fenStr.replace(/^(\d+?)(\d{2})$/g, '$1.$2'))
			},
			clickList() {
				this.queryParams.page = 1;
				this.list = [];
				this.initShopTypeIcon();
				this.doSearchList(true);
			},
			async doSearchList(e) {
				if (e) {
					uni.showLoading({
						title: "加载中..."
					})
				}
				this.queryParams.withCoupon = this.couponChecked ? '0' : '1';
				// 获取排序类型
				await this.getSortType();
				let url = '/program/mall/mallList';
				if (this.jumpType != 'search') {
					url = '/program/mall/mallChannelList'
				}
				const result = await request({
					url: url + this.$u.queryParams(this.queryParams),
					method: 'GET'
				});
				if (e) {
					uni.hideLoading();
				}
				if (result.code == 200) {
					this.searchId = result.data.searchId;
					this.list = [...this.list, ...result.data.goodsList];
					if (this.list.length >= result.data.total) {
						this.loadStatus = 'nomore';
					} else {
						this.loadStatus = 'loadmore';
					}
				} else {
					this.loadGoodsList(true);
				}
			},
			goDetail(item) {
				wx.navigateTo({
					url: '../shop-detail/shop-detail?goodsId=' + item.goodsId + '&searchId=' + this.searchId +
						'&cpType=' + this.queryParams.cpType
				})
			},
			loadmore() {
				if (this.loadStatus == 'nomore') return;
				this.loadStatus = 'loading';
				this.queryParams.page = ++this.queryParams.page;
				// 数据加载
				setTimeout(() => {
					this.doSearchList();
				}, 1000)
			},
			lower() {
				this.loadmore();
			},
			getSortType() {
				const that = this;
				return new Promise((resolve, reject) => {
					if (that.filterIndex === 0) {
						that.queryParams.sortType = 0; // 综合
					} else if (that.filterIndex === 1) {
						that.queryParams.sortType = 1; // 销量
					} else if (that.filterIndex === 2) {
						that.queryParams.sortType = 2; // 最新
					} else if (that.filterIndex === 3) {
						// 价格
						if (that.priceOrder == 1) {
							// 升序
							that.queryParams.sortType = 3;
						} else {
							// 降序
							that.queryParams.sortType = 4;
						}
					}
					// 是否过滤无券
					if (that.couponChecked) {
						that.queryParams.withCoupon = 1;
					} else {
						that.queryParams.withCoupon = 0;
					}
					resolve(true);
				})
			},
			initShopTypeIcon() {
				switch (this.queryParams.cpType) {
					case 'pdd':
						this.shopTypeIcon = '../../static/shop/pdd_logo.png';
						this.tabCurrent = 1;
						break;
					case 'jd':
						this.shopTypeIcon = '../../static/shop/jd_logo.ico';
						this.tabCurrent = 0;
						break;
					case 'wph':
						this.shopTypeIcon = '../../static/shop/wph_logo.png';
						this.tabCurrent = 2;
						break;
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.navbar-title{
		font-size: 30rpx;
		display: flex;
		justify-content: start;
		align-items: center;
	}	
	.navbar,.search-box,.shop-type-box{
		position: fixed;
		left: 0;
		z-index: 100;
	}
	.search-box{
		background-color: #FFFFFF;
		width: 100%;
		top: 0rpx;
	}
	.shop-type-box{
		top: 100rpx;
		width: 100%;
	}
	.itemCurrent{
		color: #fa436a;
	}
	.navbar{
		top: 200rpx;
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0,0,0,.06);
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			color: #757575;
			font-size: 26rpx;
			font-weight: 400;
			position: relative;
			&.current{
				color: #fa436a;
				// &:after{
				// 	content: '';
				// 	position: absolute;
				// 	left: 50%;
				// 	bottom: 0;
				// 	transform: translateX(-50%);
				// 	width: 120upx;
				// 	height: 0;
				// 	border-bottom: 4upx solid #fa436a;
				// }
			}
		}
		.p-box{
			display: flex;
			flex-direction: column;
			.yticon{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;
				&.active{
					color: #fa436a;
				}
			}
			.xia{
				transform: scaleY(-1);
			}
		}
		.cate-item{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;
		}
	}
		
	.scroll-Y{
		.item-list{
			width: 100%;
			min-height: 100%;
			display: flex;
			flex-wrap: wrap;
			background-color: rgb(240, 240, 240);
			.item-item {
			    width: 356rpx;
			    margin-left: 14rpx;
			    height: 646rpx;
			    border-radius: 12rpx;
			    background-color: #fff;
			    position: relative;
			    margin-top: 20rpx;
				.item-thumbnail {
				    width: 326rpx;
				    height: 326rpx;
				    border-radius: 10rpx;
				    position: absolute;
				    left: 14rpx;
				    top: 16rpx;
				}
				.item-shop-type {
				    width: 31rpx;
				    height: 31rpx;
				    top: 363rpx;
					position: absolute;
					left: 11rpx;
					border-radius: 8rpx;
				}
				.item-title {
					position: absolute;
					left: 11rpx;
				    text-indent: 36rpx;
				    top: 360rpx;
				    right: 30rpx;
				    font-size: 24rpx;
				    display: -webkit-box;
				    overflow: hidden;
				    text-overflow: ellipsis;
				    word-wrap: break-word;
				    white-space: normal!important;
				    -webkit-line-clamp: 2;
				    -webkit-box-orient: vertical;
				}
				.item-price-box {
				    position: absolute;
				    left: 14rpx;
				    top: 436rpx;
				    display: flex;
				    align-items: baseline;
				    color: #f02038;
				    font-weight: 700;
					.item-price-prefix {
						font-size: 22rpx;
						margin-left: 2rpx;
						font-weight: lighter;
					}
					
					.item-price {
					    font-size: 42rpx;
					}
				}
				
				.item-coupon-box {
				    width: 96rpx;
				    height: 34rpx;
				    line-height: 34rpx;
				    position: absolute;
				    top: 450rpx;
				    right: 14rpx;
					.item-coupon-prefix {
					    width: 36rpx;
					    font-size: 20rpx;
					    color: #fff;
					    left: 0;
							height: 34rpx;
							line-height: 34rpx;
							text-align: center;
							position: absolute;
							top: 0;
					}
					.item-coupon-price {
					    height: 34rpx;
					    line-height: 34rpx;
					    text-align: center;
					    position: absolute;
					    top: 0;
							right: 0;
							width: 60rpx;
							color: #ff3624;
							font-size: 22rpx;
					}
				}
				.item-line {
				    position: absolute;
				    left: 14rpx;
				    right: 14rpx;
				    top: 508rpx;
				    height: 1rpx;
				    background: #e5e5e5;
				}
				.item-price-origin {
				    left: 14rpx;
				    text-decoration: line-through;
				}
				
				.item-price-origin,.item-sale {
				    font-size: 20rpx;
				    color: #a9a9a9;
				    font-weight: lighter;
				    position: absolute;
				    top: 526rpx;
				}
				.item-sale {
				    margin-left: 20rpx;
				    right: 14rpx;
				}
				.item-money-earn {
				    width: 320rpx;
				    height: 62rpx;
				    text-align: center;
				    line-height: 62rpx;
				    font-size: 26rpx;
				    color: #fff;
				    border-radius: 10rpx;
				    position: absolute;
				    left: 16rpx;
				    top: 568rpx;
				    font-weight: 700;
				}
			}
		}
	}
	
</style>

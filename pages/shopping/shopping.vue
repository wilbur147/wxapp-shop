<template>
	<view class="u-bg-gray">
		<!-- 导航栏 -->
		<u-navbar :is-back="false" title="测试导航栏" :background="background">
			<view class="slot-wrap u-flex-wrap">
				<view class="u-flex-c">
					<image class="navbar-images" src="../../static/shop/拼多多logo.png" mode="widthFix"></image>
					<image class="navbar-images" src="../../static/shop/京东logo.png" mode="widthFix"></image>
					<image class="navbar-images" src="../../static/shop/唯品会logo.png" mode="widthFix"></image>
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

<script>
	export default {
		data() {
			return {
				background: {
					// backgroundColor: '#001f3f',
					
					// 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					// backgroundSize: 'cover',
					
					// 渐变色
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				searchValue: "",
				searchActionStyle: {
					"position":"absolute",
					"right":"40rpx",
					"overflow": "visible",
					"width": "inherit",
					"line-height": "5rpx",
					"padding": "25rpx",
					"border-radius": "30rpx",
					"background-color": "#ff9900"
				},
				adImagesList: [
					{
						icon: '../../static/shop/o_1f55hj3cc84e17vh4gq1em71ahn1c.png',
						name: ''
					},
					{
						icon: '../../static/shop/o_1f55hjjre1snkf5e77s18us1hde1h.png',
						name: ''
					},
					{
						icon: '../../static/shop/o_1f55hjtp535q4b2br6cni18do1m.png',
						name: ''
					},
					{
						icon: '../../static/shop/o_1f55hk4bciso1fbl93h6ka17v1r.png',
						name: ''
					}
				],
				loadStatus: 'loadmore',
				flowList: [],
				list: [
					{
						price: 35,
						title: '北国风光，千里冰封，万里雪飘',
						shop: '李白杜甫白居易旗舰店',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
					},
					{
						price: 75,
						title: '望长城内外，惟余莽莽',
						shop: '李白杜甫白居易旗舰店',
						image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg',
					},
					{
						price: 385,
						title: '大河上下，顿失滔滔',
						shop: '李白杜甫白居易旗舰店',
						image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
					},
					{
						price: 784,
						title: '欲与天公试比高',
						shop: '李白杜甫白居易旗舰店',
						image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
					},
					{
						price: 7891,
						title: '须晴日，看红装素裹，分外妖娆',
						shop: '李白杜甫白居易旗舰店',
						image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2130_s.jpg',
					},
					{
						price: 2341,
						shop: '李白杜甫白居易旗舰店',
						title: '江山如此多娇，引无数英雄竞折腰',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23346_s.jpg',
					},
					{
						price: 661,
						shop: '李白杜甫白居易旗舰店',
						title: '惜秦皇汉武，略输文采',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg',
					},
					{
						price: 1654,
						title: '唐宗宋祖，稍逊风骚',
						shop: '李白杜甫白居易旗舰店',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
					},
					{
						price: 1678,
						title: '一代天骄，成吉思汗',
						shop: '李白杜甫白居易旗舰店',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
					},
					{
						price: 924,
						title: '只识弯弓射大雕',
						shop: '李白杜甫白居易旗舰店',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
					},
					{
						price: 8243,
						title: '俱往矣，数风流人物，还看今朝',
						shop: '李白杜甫白居易旗舰店',
						image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
					},
				],
			}
		},
		onLoad() {
			this.addRandomData();
		},
		onReachBottom() {
			this.loadStatus = 'loading';
			// 模拟数据加载
			setTimeout(() => {
				this.addRandomData();
				this.loadStatus = 'loadmore';
			}, 1000)
		},
		methods: {
			toSearch(){
				console.log("触发搜索点击");
			},
			addRandomData() {
				for(let i = 0; i < 10; i++) {
					let index = this.$u.random(0, this.list.length - 1);
					// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					let item = JSON.parse(JSON.stringify(this.list[index]))
					item.id = this.$u.guid();
					this.flowList.push(item);
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

<style lang="scss" scoped>
	.u-flex-c{
		padding-left: 22rpx;
		padding-top: 16rpx;
		.navbar-images{
			width: 40rpx;
			border-radius: 50%;
			border: 4rpx solid #FFFFFF;
		}
	}
	.ad-image{
		border-radius: 30rpx;
		margin: 0rpx auto;
		width: 94%;
		height: 190rpx!important;
	}
	
	.first-image{
		width: 306rpx!important;
		height: 420rpx!important;
	}
	.goods-to-wrap{
		.u-row{
			height: 205rpx!important;
		}
		.second-image{
			width: 410rpx;
			height: 205rpx!important;
		}
	}
	
	.third-image{
		width: 410rpx;
		height: 210rpx!important;
		position: absolute;
		top: -8rpx
	}
	
	.section{
		width: 100vw;
		margin-top: 20rpx;
		.section-top{
			width: 100vw;
			display: flex;
			align-items: center;
			height: 60rpx;
			.section-text{
				font-size: 30rpx;
				font-weight: bold;
				margin-left: 20rpx;
			}
		}
		
		.section-bottom{
			width: 100vw;
			padding: 12rpx;
			text-align: center;
			.scroll-view_X{
				width: 100%;
				white-space: nowrap;
				.section-bottom-item{
					width: 25%;
					display: inline-block;
					image {
					  width: 15vw;
					  height: 15vw;
					  margin: auto;
					}
					text {
					  color: #707070;
					  font-size: 24rpx;
					  text-align: center;
					  width: 20vw;
					  display:block;
					  white-space: pre-line;
					  margin: auto;
					}
				}
			}
		}
	}
	
	.sell-wrap{
		border-radius: 15rpx;
		background-color: #FFFFFF;
		width: 95%;
		height: 160rpx;
		margin: 20rpx auto;
		.type-title{
			font-size: 34rpx;
			font-weight: 600;
			margin-bottom: 15rpx;
			text-align: center;
			margin-top: 34rpx;
		}
		
		.type-desc{
			font-size: 22rpx;
			text-align: center;
			height: 40rpx;
			line-height: 40rpx;
			width: 140rpx;
			margin: auto;
		}
		
		.type-active{
			background-color: #F29100;
			border-radius: 30rpx;
		}
	}
	
	
	
	
	
	
	
	
	.demo-warter {
			border-radius: 8px;
			margin: 5px;
			background-color: #ffffff;
			padding: 8px;
			position: relative;
		}
		
		.u-close {
			position: absolute;
			top: 32rpx;
			right: 32rpx;
		}
		
		.demo-image {
			width: 100%;
			border-radius: 4px;
		}
		
		.demo-title {
			font-size: 30rpx;
			margin-top: 5px;
			color: $u-main-color;
		}
		
		.demo-tag {
			display: flex;
			margin-top: 5px;
		}
		
		.demo-tag-owner {
			background-color: $u-type-error;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			padding: 4rpx 14rpx;
			border-radius: 50rpx;
			font-size: 20rpx;
			line-height: 1;
		}
		
		.demo-tag-text {
			border: 1px solid $u-type-primary;
			color: $u-type-primary;
			margin-left: 10px;
			border-radius: 50rpx;
			line-height: 1;
			padding: 4rpx 14rpx;
			display: flex;
			align-items: center;
			border-radius: 50rpx;
			font-size: 20rpx;
		}
		
		.demo-price {
			font-size: 34rpx;
			color: $u-type-error;
			margin-top: 5px;
		}
		
		.demo-shop {
			font-size: 22rpx;
			color: $u-tips-color;
			margin-top: 5px;
		}
</style>

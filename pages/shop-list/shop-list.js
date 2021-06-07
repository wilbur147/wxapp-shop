import {request} from "../../utils/request";
export default {
		data() {
			return {
				searchValue: "",
				jumpType: 'search',
				searchActionStyle: {
					"position": "absolute",
					"right": "40rpx",
					"overflow": "visible",
					"width": "inherit",
					"line-height": "5rpx",
					"padding": "25rpx",
					"border-radius": "30rpx",
					"background-color": "#ff3624"
				},
			};
		},
		onLoad(opt) {
			this.searchValue = opt.keywords;
			this.jumpType = opt.jumpType;
		},
		methods: {
			
		}
	}
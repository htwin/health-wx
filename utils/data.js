
/**
 * 技师 数据
 * */ 
function getSkilledData(){
    var arr = [
                {
                        company:"西狮独品美容美发有限公司",
        avatar:"../../images/store1.png",
                        nickname:'张技师',
                        price:'¥500',
                        message:'从事美发行业60余年，有丰富经验',
                        distance:'100m'
                    },
                    {
                        company:"圆月亮美甲沙龙",
                      avatar:"../../images/store1.png",
                        nickname:'包技师',
                        price:'¥800',
                        message:'从事美发行业60余年，有丰富经验',
                        distance:'200m'
                    },
                    {
                        company:"璀璨美睫会所",
                      avatar:"../../images/store1.png",
                        nickname:'王技师',
                        price:'¥600',
                        message:'从事美发行业60余年，有丰富经验',
                        distance:'100m'
                    },
                    {
                        company:"柔丝妮美容养生馆",
                      avatar:"../../images/store1.png",
                        nickname:'黄技师',
                        price:'¥800',
                        message:'从事美发行业60余年，有丰富经验',
                        distance:'400m'
                    }
            ]
    return arr
}


/*
 * 对外暴露接口
 */ 
module.exports = {
 
  getSkilledData :getSkilledData,
 

}
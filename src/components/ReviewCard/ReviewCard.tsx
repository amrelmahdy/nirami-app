import { Text, View } from "react-native"
import { Rating } from "react-native-ratings"
import NIText from "../NIText/NIText"
import moment from "moment"
import { getIconUrl } from "../../assets/icons"
import { Images } from "../../assets"
import { Icon } from "react-native-paper"
import { Review } from "../../hooks/reviews.hooks"





type ProductCardProps = {
    review: Review
}

export default function ReviewCard({ review }: ProductCardProps) {
    return <View key={review.id || review._id} style={{ borderWidth: 1, borderColor: '#efefef', paddingVertical: 10, paddingHorizontal: 15, marginVertical: 10, borderRadius: 10 }}>
        <View style={{ flexDirection: 'row', direction: 'rtl', alignItems: 'center', marginBottom: 5 }}>
            {review.showName && <NIText>{review?.user?.firstName}</NIText>}
            <Rating
                type='custom'
                imageSize={18}
                //showRating
                onFinishRating={() => { }}
                style={{ paddingHorizontal: review.showName ?  5 : 0 , backgroundColor: '#FFF' }}
                readonly
                ratingColor='#000000'
                startingValue={review.rating}
                tintColor="#FFF"
                ratingBackgroundColor="#bebebe"
                ratingTextColor="red"
            />
           {review.rating > 0 && <Text>{review.rating}</Text>}
        </View>
        <View>
            <NIText>{review.review}</NIText>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon source={getIconUrl(Images, 'ic_ei_like')} size={24} />
                <NIText style={{ color: "#797780" }}>مفيد</NIText>
            </View>

            <NIText style={{ color: "#797780", }}>{
                moment(review.createdAt).format("DD/MM/YYYY")
            }</NIText>
        </View>
    </View>
}
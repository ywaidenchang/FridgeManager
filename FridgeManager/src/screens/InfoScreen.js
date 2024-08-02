import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

const InfoScreen = () => {
    const route = useRoute();
    const name = route.params.name;
    const conDate = route.params.conDate;

    return (
        <View>
            <Text>
                {`식품명: ${name}`}
                {`소비기한: ${conDate}`}
            </Text>
        </View>
    );
};
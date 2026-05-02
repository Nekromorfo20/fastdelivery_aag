// import { useTheme } from "@ui-kitten/components"
// import { Icon } from "@ui-kitten/components"
// import { StyleSheet } from "react-native"

// // URL de listado de colores de Eva Icons:
// // https://akveo.github.io/react-native-ui-kitten/docs/design-system/eva-light-theme

// interface MyIconProps {
//     name : string
//     color? : string
//     white? : boolean
// }

// export const MyIcon = ({ name, color, white=false } : MyIconProps) => {
//     const theme = useTheme()

//     if (white) {
//         color = theme['color-info-100']
//         color = '#F2F8FF'
//     } else if (!color) {
//         color = theme['text-basic-color']
//         color = '#222B45'
//     } else {
//         color = theme[color] ?? theme['text-basic-color']
//     }

//     return <Icon style={styles.icon} fill={color} name={name} />
// }

// const styles = StyleSheet.create({
//     icon: {
//         width: 30,
//         height: 30
//     }
// })
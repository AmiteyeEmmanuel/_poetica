import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp

} from 'react-native-responsive-screen';

export const partialStyles = StyleSheet.create({
  container: {
    paddingTop: 62,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 16,
    width: "90%",
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  bellContainer: {
    width: 20,
    height: 20,
    backgroundColor: "#F96666",
    position: "absolute",
    borderRadius: 50,
    right: -1,
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bellButton: {
    // borderWidth: 1,
    // borderColor: "#E1E2E5",
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  bellIcon: {
    alignSelf: "center",
  },
  helloText: {
    color: "#7C7C80",
    fontSize: 16,
    fontWeight: 700,
  },
  image: {
    width: 45,
    height: 45,
    marginRight: 8,
    borderRadius: 100,
  },
  text: {
    fontSize: 16,
  },
});

export const searchStyles = StyleSheet.create({
  filterContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 10,
    borderColor: "#5A72A0",
    borderWidth: 1, 
    borderRadius: 15,
    width: wp('92%'),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 10
  },
  searchIconContainer: { 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },

  input: {
    flex: 1,
    fontSize: 18,
    color: "#000000",
    paddingVertical: 10,
    width: 271,
    height: 45,
  },
  filterButton: {
    padding: 10,
    backgroundColor: "#F7F9F2",
    borderRadius: 4,
  },
});

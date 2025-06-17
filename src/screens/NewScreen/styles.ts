import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 50
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 5
  },
  itemText: {
    flex: 1,
    fontSize: 16
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  quantityBtn: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    color: '#007AFF'
  },
  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  }
})

export default styles

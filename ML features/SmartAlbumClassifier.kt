package com.example.focalmltest

object SmartAlbumClassifier {

    fun classify(labels: List<String>): String {

        val cleanLabels = labels.map { it.lowercase() }

        return when {

            cleanLabels.any {
                it.contains("receipt") ||
                        it.contains("invoice") ||
                        it.contains("bill")
            } -> "Receipts"

            cleanLabels.any {
                it.contains("screenshot") ||
                        it.contains("screen")
            } -> "Screenshots"

            cleanLabels.any {
                it.contains("food") ||
                        it.contains("dish") ||
                        it.contains("meal") ||
                        it.contains("cuisine") ||
                        it.contains("pizza") ||
                        it.contains("dessert") ||
                        it.contains("fruit")
            } -> "Food"

            cleanLabels.any {
                it.contains("person") ||
                        it.contains("people") ||
                        it.contains("selfie") ||
                        it.contains("face")
            } -> "People"

            cleanLabels.any {
                it.contains("document") ||
                        it.contains("paper") ||
                        it.contains("text") ||
                        it.contains("handwriting")
            } -> "Documents"

            else -> "Others"
        }
    }
}
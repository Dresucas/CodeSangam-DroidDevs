package com.example.focalmltest

import android.content.Context
import android.net.Uri
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.label.ImageLabeling
import com.google.mlkit.vision.label.defaults.ImageLabelerOptions

class ImageLabeler {

    private val labeler = ImageLabeling.getClient(
        ImageLabelerOptions.Builder()
            .setConfidenceThreshold(0.6f)
            .build()
    )

    fun analyzeImage(
        context: Context,
        imageUri: Uri,
        onSuccess: (List<String>) -> Unit,
        onError: (Exception) -> Unit
    ) {
        try {
            val image = InputImage.fromFilePath(context, imageUri)

            labeler.process(image)
                .addOnSuccessListener { labels ->

                    val detectedLabels = labels.map { label ->
                        label.text
                    }

                    onSuccess(detectedLabels)
                }
                .addOnFailureListener { exception ->
                    onError(exception)
                }

        } catch (exception: Exception) {
            onError(exception)
        }
    }
}
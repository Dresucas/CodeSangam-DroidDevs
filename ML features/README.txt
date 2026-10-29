FOCAL - ML FEATURES

Files:
1. ImageLabeler.kt
   - Uses Google ML Kit Image Labeling.
   - Analyzes an image and returns detected labels.

2. SmartAlbumClassifier.kt
   - Uses the detected labels to categorize images.
   - Current categories:
     - Food
     - People
     - Documents
     - Receipts
     - Screenshots
     - Others
REQUIRED DEPENDENCY:

Add the following line inside the dependencies { } section
of the Focal app-level build.gradle.kts file:

implementation("com.google.mlkit:image-labeling:17.0.9")


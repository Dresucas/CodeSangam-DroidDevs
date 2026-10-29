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

INTEGRATION:

1. Copy ImageLabeler.kt into the Focal Android source package.
2. Copy SmartAlbumClassifier.kt into the same package.
3. Change the package line at the top of both Kotlin files
   so that it matches the Focal project's package name.
4. Add the ML Kit dependency shown above.
5. Sync Gradle.
6. ImageLabeler analyzes the image and returns labels.
7. Pass those labels to SmartAlbumClassifier.classify(labels)
   to get the Smart Album category.



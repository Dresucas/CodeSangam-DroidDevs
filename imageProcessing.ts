import * as ImageManipulator from 'expo-image-manipulator';

export async function prepareImageForHashing(imageUri: string): Promise<string> {
    // 1. Set the target dimensions to exactly 9 columns by 8 rows
    const actions = [
        { resize: { width: 9, height: 8 } }
    ];
    
    
    const result = await ImageManipulator.manipulateAsync(
        imageUri,
        actions,
        { format: ImageManipulator.SaveFormat.JPEG, compress: 0.4 }
    );
    
    
    return result.uri;
}

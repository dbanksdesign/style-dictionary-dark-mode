//
//  BorderView.swift
//  StyleDictionaryDarkModeDemo
//
//  Created by Banks, Daniel on 4/6/21.
//  Copyright © 2021 Amazon. All rights reserved.
//

import Foundation
import SwiftUI
import StyleDictionaryDarkMode

struct BorderRow: View {
    var label: String
    var color: Color
    
    var body: some View {
        HStack {
            VStack(alignment: .leading) {
                Text(label)
            }.padding(10)
            Spacer()
        }
        .border(color, width:Size.borderWidthLarge)
    }
}

struct BorderView: View {
    var body: some View {
        VStack {
            BorderRow(label:"Primary", color:Color.borderPrimary)
            BorderRow(label:"Secondary", color:Color.borderSecondary)
            BorderRow(label:"Tertiary", color:Color.borderTertiary)
            BorderRow(label:"Interactive", color:Color.borderInteractive)
            BorderRow(label:"Hover", color:Color.borderHover)
            BorderRow(label:"Active", color:Color.borderActive)
            BorderRow(label:"Disabled", color:Color.borderDisabled)
            BorderRow(label:"Danger", color:Color.borderDanger)
            BorderRow(label:"Warning", color:Color.borderWarning)
            BorderRow(label:"Success", color:Color.borderSuccess)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.backgroundPrimary)
        .navigationBarTitle("Border Colors")
    }
}

struct BorderView_Previews: PreviewProvider {
    static var previews: some View {
        BorderView()
    }
}

